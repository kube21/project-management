import React, { Component } from 'react';
import { Layout, Form, Row, Col, Input, Button, Select, message, DatePicker } from 'antd';
import moment from 'moment';
import './styles.scss';
import dictionary from '../../config/static/Dictionary';
import Spinner from '../common/Spinner/Spinner';
import HeaderMain from '../../containers/header/header-container';
import Sidebar from '../../containers/sidebar/sidebar-container';
import Footer from '../common/footer';
import { disablePastDates, disableFutureDate } from '../../utils/timeUtils';
import Regex from '../../utils/regex';

const { Header, Content } = Layout;
const { Option } = Select;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      manager: [],
      client: [],
      lead: [],
      initDate: null,
      popup: false,
      popups: false,
      formData: {}
    };
  }

  componentDidMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { popup, popups } = this.state;
    const { closeProject } = this.props;
    const { userResponse, projectCreateResponse, projectUpdateResponse } = nextprops;
    if (userResponse && userResponse.data) {
      this.userResponse(userResponse.data);
      this.setState({ loading: false });
    }
    if (projectCreateResponse && popups) {
      if (projectCreateResponse.success) {
        this.setState({ loading: false, popups: false, formData: {} });
        message.success('Project Successfully Created');
        closeProject();
        this.getProjects();
      } else {
        this.setState({ loading: false, popups: false });
        message.error(projectCreateResponse?.errorMessage || 'Error');
      }
    }
    if (projectUpdateResponse && projectUpdateResponse.success && popup) {
      this.setState({ popup: false });
      this.setState({ loading: false });
      message.success('Project Successfully Updated');
      closeProject();
      this.getProjects();
    }
  }

  getProjects = () => {
    const { getAllProjects } = this.props;
    getAllProjects();
  };

  userResponse = response => {
    const manager = [];
    const client = [];
    const lead = [];
    response.map(data => {
      if (data.position === 'MANAGER') {
        manager.push(<Option key={String(data._id)}>{data.userName}</Option>);
      }
      if (data.position === 'CLIENT') {
        client.push(<Option key={String(data._id)}>{data.userName}</Option>);
      }
      if (data.position === 'LEADER') {
        lead.push(<Option key={String(data._id)}>{data.userName}</Option>);
      }
    });
    this.setState({ manager, client, lead });
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await Object.keys(values).forEach(key => !values[key] && delete values[key]);
        values.projectCompleted = values.projectCompleted === 'completed';
        this.saveProject(values);
        this.setState({ loading: true });
      }
    });
  };

  saveProject = data => {
    const { saveProject, updateProject, currentProject } = this.props;
    if (currentProject) {
      data.id = currentProject._id;
      updateProject(data);
      this.setState({ popup: true });
    } else {
      saveProject(data);
      this.setState({ popups: true, formData: data });
    }
  };

  onCancel = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderFormView = () => {
    const { loading, manager, client, lead, initDate, formData } = this.state;
    const { isOpen, form, currentProject = formData } = this.props;
    const projectStatus = currentProject.projectCompleted ? 'Completed' : 'Incomplete';
    const {
      projectName,
      technology,
      // managerId,
      // clientId,
      leadId,
      startDate,
      endDate
    } = currentProject;

    const { getFieldDecorator } = form;
    const splWidth = isOpen ? 12 : 6;
    return (
      <div>
        {loading && (
          <span>
            <Spinner />
          </span>
        )}
        {!loading && (
          <Form
            style={{ paddingBottom: '3rem' }}
            layout="vertical"
            onSubmit={() => this.handleSubmit(window.event)}
          >
            {isOpen && [
              <>
                <Row gutter={16} className="row">
                  <Col span={12}>
                    <h1>
                      {currentProject.id ? dictionary.EDIT_PROJECT : dictionary.CREATE_PROJECT}
                    </h1>
                  </Col>
                </Row>
                {currentProject.id && (
                  <Row gutter={16} className="row">
                    <Col sm={12} md={12} lg={12} xl={splWidth}>
                      <Form.Item>
                        <h4 className="href-txt">{projectName && projectName.toUpperCase()}</h4>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </>
            ]}
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.PROJECT_NAME}>
                  {getFieldDecorator('projectName', {
                    initialValue: projectName || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Project Name'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Project name must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.PROJECT_NAME} />)}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.TECHNOLOGY}>
                  {getFieldDecorator('technology', {
                    initialValue: technology || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Technology Name'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Technology must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.TECHNOLOGY} />)}
                </Form.Item>
              </Col>
            </Row>
            

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.START_DATE}>
                  {getFieldDecorator('startDate', {
                    initialValue: (startDate && moment(startDate)) || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Select Start Date'
                      }
                    ]
                  })(
                    <DatePicker
                      allowClear={false}
                      placeholder={dictionary.START_DATE}
                      onChange={date => this.setState({ initDate: date })}
                      disabledDate={date => disablePastDates(date)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.END_DATE}>
                  {getFieldDecorator('endDate', {
                    initialValue: (endDate && moment(endDate)) || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Select End Date'
                      }
                    ]
                  })(
                    <DatePicker
                      allowClear={false}
                      placeholder={dictionary.END_DATE}
                      disabledDate={date =>
                        disableFutureDate(date, initDate || (startDate && moment(startDate)))}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Button type="primary" htmlType="submit" icon="plus">
                  {currentProject.id ? dictionary.UPDATE : dictionary.SUBMIT}
                </Button>
              </Col>
              <Col
                sm={12}
                md={12}
                lg={12}
                xl={splWidth}
                xxl={splWidth}
                style={{ textAlign: 'right' }}
              >
                <Button type="primary" htmlType="reset" icon="undo" onClick={() => this.onCancel()}>
                  {dictionary.CANCEL}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  };

  renderInFullScreen() {
    return (
      <>
        <HeaderMain isCompany loggedIn />
        <Layout className="layoutStyle">
          <Sidebar {...this.props} />
          <Layout>
            <Header className="headerStyle">{dictionary.CREATE_PROJECT}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderFormView()}</div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </>
    );
  }

  render() {
    const { isOpen } = this.props;
    return <>{isOpen ? this.renderFormView() : this.renderInFullScreen()}</>;
  }
}

export default Form.create()(New);
