/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import {
  BackTop,
  Layout,
  Form,
  Row,
  Col,
  Input,
  Collapse,
  Button,
  Table,
  Drawer,
  Icon,
  Popconfirm,
  message
} from 'antd';
import moment from 'moment';
import dictionary from '../../config/static/Dictionary';
import HeaderMain from '../../containers/header/header-container';
import Sidebar from '../../containers/sidebar/sidebar-container';
import Footer from '../common/footer';
import NewProject from '../../containers/projects/new-project';
import './styles.scss';
import { compareObjects } from '../../utils/utils';

const { Header, Content } = Layout;
const { Panel } = Collapse;

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultJson: [],
      loading: true,
      visibleCreate: false,
      visibleEdit: false,
      items: [],
      lastDeletedId: false,
      searchValue: ''

    };
  }

  componentDidMount() {
    this.getProjects();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { projectResponse, projectDeleteResponse } = nextprops;
    const { items, lastDeletedId } = this.state;
    if (projectResponse && projectResponse.data) {
      if (compareObjects(items, projectResponse.data)) {
        this.setState({
          resultJson: projectResponse.data,
          items: projectResponse.data,
          loading: false
        });
      }
    }
    if (projectDeleteResponse && projectDeleteResponse.success && lastDeletedId) {
      this.setState({ lastDeletedId: false });
      this.getProjects();
      setTimeout(() => {
        message.success('Project successfully deleted');
      }, 2000);
    }
  }

  getProjects = () => {
    const { getAllProjects } = this.props;
    getAllProjects();
  };

  editProject = currentProject => {
    this.setState({
      currentProject,
      visibleEdit: true,
      visibleCreate: false
    });
  };

  deleteProject = id => {
    const { deleteProject } = this.props;
    deleteProject(id);
    this.setState({ loading: true, lastDeletedId: true });
  };

  handleChange = event => {
    const { value } = event.target;
    const { items } = this.state;

    const resultJson = items.filter(item => {
      item.completed = item.projectCompleted === true ? 'Completed' : '';
      item.incomplete = item.projectCompleted === false ? 'Incomplete' : '';
      return (
        item.startDate.toLowerCase().search(value.toLowerCase()) !== -1
        || item.endDate.toLowerCase().search(value.toLowerCase()) !== -1
        || item.projectName.toLowerCase().search(value.toLowerCase()) !== -1
        || item.technology.toLowerCase().search(value.toLowerCase()) !== -1
        || item.incomplete.toLowerCase().search(value.toLowerCase()) === 0
        || item.completed.toLowerCase().search(value.toLowerCase()) === 0
      );
    });
    this.setState({ resultJson, searchValue: value });
  };

  onCreate = () => {
    this.setState({ visibleCreate: false });
  };

  onEdit = () => {
    this.setState({ visibleEdit: false });
  };

  renderProjects() {
    const { loading, resultJson, visibleCreate, visibleEdit, currentProject, searchValue } = this.state;
    const tableColums = [
      {
        title: 'Project Name',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (text, record) => {
          return (
            <a href="#" onClick={() => this.editProject(record)}>
              {record.projectName}
            </a>
          );
        }
      },
      {
        title: 'Technology',
        dataIndex: 'technology',
        key: 'technology',
        render: (text, record) => record.technology || '-'
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (text, record) => moment(record.startDate).format('YYYY-MM-DD') || '-'
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => moment(record.endDate).format('YYYY-MM-DD') || '-'
      },
      {
        title: 'Project Status',
        dataIndex: 'projectCompleted',
        key: 'projectCompleted',
        render: (text, record) => (record.projectCompleted ? 'Completed' : 'Incomplete' || '-')
      },
      {
        title: 'Delete',
        dataIndex: 'mode',
        key: 'mode',
        render: (text, record) => {
          return (
            <Popconfirm
              title="Do you want to delete this project?"
              onConfirm={() => this.deleteProject(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Icon className="delete-icon" type="delete" />
            </Popconfirm>
          );
        }
      }
    ];

    return (
      <div>
        <Form name="documentList" layout="vertical">
          {/* {loading ? (
            <span>
              <Spinner />
            </span>
          ) : ( */}
          <div>
            <Row gutter={16} className="row" style={{ marginBottom: '10px' }}>
              <Col span={5} offset={19}>
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() => this.setState({ visibleCreate: true, visibleEdit: false })}
                >
                  {dictionary.CREATE_PROJECT}
                </Button>
              </Col>
            </Row>
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header={dictionary.ENTER_SEARCH_CRITERIA_HEADER} key="1">
                <Row gutter={16} className="row">
                  <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={dictionary.SEARCH}>
                      <Input
                        placeholder={dictionary.SEARCH_PROJECT}
                        onChange={this.handleChange}
                        name="id"
                        value={searchValue}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Row gutter={16} className="row">
              <Col span={24}>
                <Table
                  loading={loading}
                  rowKey={record => record.id}
                  showHeader
                  columns={tableColums}
                  dataSource={resultJson}
                  scroll={{ x: true }}
                />
              </Col>
            </Row>
          </div>
          {/* )} */}
        </Form>

        <Drawer
          style={{ marginTop: '50px' }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleCreate: false })}
          visible={visibleCreate}
        >
          <NewProject {...this.props} closeProject={this.onCreate} isOpen />
        </Drawer>
        <Drawer
          style={{ marginTop: '50px' }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleEdit: false })}
          visible={visibleEdit}
        >
          <NewProject
            {...this.props}
            closeProject={this.onEdit}
            isOpen
            currentProject={currentProject}
          />
        </Drawer>
      </div>
    );
  }

  renderInFullScreen() {
    return (
      <>
        <HeaderMain isCompany loggedIn />
        <Layout className="layoutStyle">
          <Sidebar {...this.props} />
          <Layout>
            <Header className="headerStyle">{dictionary.PROJECTS}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderProjects()}</div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
        <BackTop>
          <div className="ant-back-top-inner">{dictionary.UP_LABEL}</div>
        </BackTop>
      </>
    );
  }

  render() {
    const { isOpen } = this.props;
    return <>{isOpen ? this.renderProjects() : this.renderInFullScreen()}</>;
  }
}
export default Form.create()(Find);
