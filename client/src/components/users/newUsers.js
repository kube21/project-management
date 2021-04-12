/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import moment from "moment";
import {
  Layout,
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  message,
  DatePicker,
  TreeSelect,
} from "antd";
import dictionary from "../../config/static/Dictionary";
import Spinner from "../common/Spinner/Spinner";
import HeaderMain from "../../containers/header/header-container";
import Sidebar from "../../containers/sidebar/sidebar-container";
import Footer from "../common/footer";
import * as OPTIONS from "../../helpers/selectOptions";
import { compareObjects } from "../../utils/utils";
import * as time from "../../utils/timeUtils";
import Regex from "../../utils/regex";

const { Header, Content } = Layout;
const { TreeNode } = TreeSelect;
const { Option } = Select;

class NewUSer extends Component {
  constructor(props) {
    super(props);
    props.form.resetFields();
    this.state = {
      loading: true,
      projectOptions: [],
      formData: {},
    };
  }

  componentDidMount() {
    const { getAllProjects } = this.props;
    getAllProjects();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const projectOptions = [];
    const { projectResponse } = nextProps;
    if (projectResponse && projectResponse.data) {
      projectResponse.data.map((data, index) => {
        projectOptions.push(
          <TreeNode value={data._id} title={data.projectName} key={index} />
        );
      });
      this.setState({ projectOptions });
    }
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    const { createResponse, updateResponse, closeUser } = this.props;
    if (compareObjects(createResponse, prevProps.createResponse)) {
      if (createResponse.success) {
        this.setState({ loading: false, formData: {} });
        message.success("User Successfully Created");
        closeUser && closeUser();
        this.getUsers();
      } else {
        message.error(createResponse.errorMessage);
      }
    }
    if (compareObjects(updateResponse, prevProps.updateResponse)) {
      this.setState({ loading: false });
      message.success("user Successfully Updated");
      closeUser && closeUser(updateResponse);
      this.getUsers();
    }
  }

  handleSubmit = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await Object.keys(values).forEach(
          (key) => !values[key] && delete values[key]
        );
        this.createUser(values);
        this.setState({ loading: true, formData: values });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  getUsers = () => {
    const { getAllUsers } = this.props;
    getAllUsers();
  };

  createUser = (data) => {
    const { createUser, updateUser, currentUser } = this.props;
    if (currentUser) {
      data.id = currentUser._id;
      updateUser(data);
    } else {
      createUser(data);
    }
  };

  onCancel = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderFormView = () => {
    const { loading, projectOptions, formData } = this.state;
    const { isOpen, form, currentUser = formData } = this.props;
    const { getFieldDecorator } = form;
    const splWidth = isOpen ? 12 : 6;
    const {
      userName,
      email,
      phoneNumber,
      gender,
      position,
      projectId,
      dateOfBirth,
      dateOfJoining,
    } = currentUser;
    return (
      <div>
        {loading && (
          <span>
            <Spinner />
          </span>
        )}
        {!loading && (
          <Form
            style={{ paddingBottom: "3rem" }}
            layout="vertical"
            onSubmit={() => this.handleSubmit(window.event)}
          >
            {isOpen && [
              <>
                <Row gutter={16} className="row">
                  <Col span={12}>
                    <h1>
                      {currentUser._id
                        ? dictionary.EDIT_USER
                        : dictionary.CREATE_USER}
                    </h1>
                  </Col>
                </Row>
                {currentUser._id && (
                  <Row gutter={16} className="row">
                    <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                      <Form.Item>
                        <h4 className="href-txt">
                          {userName && userName.toUpperCase()}
                        </h4>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </>,
            ]}
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.USER_NAME}>
                  {getFieldDecorator("userName", {
                    initialValue: userName || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the User Name",
                      },
                      {
                        pattern: new RegExp(Regex.ALPHABET),
                        message: "user name must be alphabets",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.USER_NAME}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.SELECT_POSITION}>
                  {getFieldDecorator("position", {
                    initialValue: position || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select the Position",
                      },
                    ],
                  })(
                    <Select
                      showSearch
                      placeholder={dictionary.SELECT_POSITION}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option disabled value="">
                        {dictionary.PLEASE_SELECT}
                      </Option>
                      {OPTIONS.position}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.E_MAIL}>
                  {getFieldDecorator("email", {
                    initialValue: email || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Email",
                      },
                      {
                        type: "email",
                        message: "Please enter the valid email",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.E_MAIL}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item
                  label={
                    dictionary[currentUser._id ? "CHANGE_PASSWORD" : "PASSWORD"]
                  }
                  extra={
                    currentUser._id && "Optional: To reset password enter here"
                  }
                >
                  {getFieldDecorator("password", {
                    initialValue: "",
                    rules: [
                      {
                        required: !currentUser._id,
                        message: dictionary.INPUT_PASSWORD_MSG,
                      },
                    ],
                  })(
                    <Input.Password
                      autoComplete="new-password"
                      type="password"
                      className="commonText"
                      placeholder={dictionary.PASSWORD}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.PHONE_NUMBER}>
                  {getFieldDecorator("phoneNumber", {
                    initialValue: phoneNumber || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Phone Number",
                      },
                      {
                        max: 10,
                        pattern: new RegExp(Regex.PHONE),
                        message: "phone number must be 10 digit number",
                      },
                    ],
                  })(
                    <Input
                      type="number"
                      className="commonText"
                      placeholder={dictionary.PHONE_NUMBER}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.SELECT_GENDER}>
                  {getFieldDecorator("gender", {
                    initialValue: gender || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select the Gender",
                      },
                    ],
                  })(
                    <Select
                      showSearch
                      placeholder={dictionary.PLEASE_SELECT}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option disabled value="">
                        {dictionary.PLEASE_SELECT}
                      </Option>
                      {OPTIONS.gender}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.SELECT_PROJECT}>
                  {getFieldDecorator("projectId", {
                    initialValue: projectId || undefined,
                  })(
                    <TreeSelect
                      showSearch
                      style={{ width: 350 }}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Please select"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      filterTreeNode={(input, option) =>
                        option.props.title
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {projectOptions}
                    </TreeSelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.DATE_OF_BIRTH}>
                  {getFieldDecorator("dateOfBirth", {
                    initialValue: (dateOfBirth && moment(dateOfBirth)) || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select Date Of Birth",
                      },
                    ],
                  })(
                    <DatePicker
                      allowClear={false}
                      placeholder={dictionary.DATE_OF_BIRTH}
                      disabledDate={(date) => time.getAdultAge(date)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.DATE_OF_JOINING}>
                  {getFieldDecorator("dateOfJoining", {
                    initialValue:
                      (dateOfJoining && moment(dateOfJoining)) || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select Date Of Joining",
                      },
                    ],
                  })(
                    <DatePicker
                      allowClear={false}
                      disabledDate={(date) => time.disabledateOfJoining(date)}
                      placeholder={dictionary.DATE_OF_JOINING}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Button type="primary" htmlType="submit" icon="plus">
                  {currentUser._id ? dictionary.UPDATE : dictionary.SUBMIT}
                </Button>
              </Col>
              <Col
                sm={12}
                md={12}
                lg={12}
                xl={splWidth}
                xxl={splWidth}
                style={{ textAlign: "right" }}
              >
                <Button
                  type="primary"
                  htmlType="reset"
                  icon="undo"
                  onClick={() => this.onCancel()}
                >
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
            <Header className="headerStyle">{dictionary.CREATE_USER}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">
                {this.renderFormView()}
              </div>
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

export default Form.create()(NewUSer);
