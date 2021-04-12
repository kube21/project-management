/* eslint-disable react/jsx-indent */
import React, { Component } from "react";
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
  message,
} from "antd";
import dictionary from "../../config/static/Dictionary";
import HeaderMain from "../../containers/header/header-container";
import Sidebar from "../../containers/sidebar/sidebar-container";
import Footer from "../common/footer";
import NewUser from "../../containers/users/new-user";
import { compareObjects } from "../../utils/utils";

const { Header, Content } = Layout;
const { Panel } = Collapse;

class FindUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultJson: [],
      loading: true,
      visibleCreate: false,
      visibleEdit: false,
      items: [],
      lastDeletedId: false,
      searchValue: "",
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { userResponse, deleteResponse } = newProps;
    const { items, lastDeletedId } = this.state;
    if (userResponse && userResponse.data) {
      if (compareObjects(items, userResponse.data)) {
        this.setState({
          resultJson: userResponse.data,
          items: userResponse.data,
          loading: false,
        });
      }
    }
    console.log('deleteResponse---->>',deleteResponse)
    if (deleteResponse && deleteResponse.success && lastDeletedId) {
      this.setState({ lastDeletedId: false });
      this.getUsers();
      setTimeout(() => {
        message.success("User deleted successfully");
      }, 2000);
    }
  }

  getUsers = () => {
    const { getAllUsers } = this.props;
    getAllUsers();
  };

  editUser = (currentUser) => {
    this.setState({
      currentUser,
      visibleEdit: true,
      visibleCreate: false,
    });
  };

  deleteUser = (id) => {
    const { deleteUser } = this.props;
    deleteUser(id);
    this.setState({ loading: true, lastDeletedId: true });
  };

  handleChange = (event) => {
    const { value } = event.target;
    const { items } = this.state;
    const resultJson = items.filter((item) => {
      return (
        item.email.toLowerCase().search(value.toLowerCase()) !== -1 ||
        item.userName.toLowerCase().search(value.toLowerCase()) !== -1
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

  renderUsers() {
    const {
      loading,
      resultJson,
      visibleCreate,
      visibleEdit,
      currentUser,
      searchValue,
    } = this.state;
    const tableColums = [
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
        render: (text, record) => {
          return (
            <a href="#" onClick={() => this.editUser(record)}>
              {record.userName}
            </a>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => record.email || "-",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        render: (text, record) => record.phoneNumber || "-",
      },
      {
        title: "Position",
        dataIndex: "position",
        key: "position",
        render: (text, record) => record.position || "-",
      },
      {
        title: "Date of birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
        render: (text, record) => record.dateOfBirth || "-",
      },
      {
        title: "Date of joining",
        dataIndex: "dateOfJoining",
        key: "dateOfJoining",
        render: (text, record) => record.dateOfJoining || "-",
      },
      {
        title: "Delete",
        dataIndex: "mode",
        key: "mode",
        render: (text, record) => {
          return (
            <Popconfirm
              title="Do you want to delete this user?"
              onConfirm={() => this.deleteUser(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Icon className="delete-icon" type="delete" />
            </Popconfirm>
          );
        },
      },
    ];

    return (
      <div>
        <Form name="documentList" layout="vertical">
          <div>
            <Row gutter={16} className="row" style={{ marginBottom: "10px" }}>
              <Col span={5} offset={19}>
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() =>
                    this.setState({ visibleCreate: true, visibleEdit: false })
                  }
                >
                  {dictionary.CREATE_USER}
                </Button>
              </Col>
            </Row>
            <Collapse defaultActiveKey={["1"]} accordion>
              <Panel header={dictionary.ENTER_SEARCH_CRITERIA_HEADER} key="1">
                <Row gutter={16} className="row">
                  <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={dictionary.SEARCH}>
                      <Input
                        placeholder={dictionary.SEARCH_USER}
                        onChange={this.handleChange}
                        name="user_search"
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
                  rowKey={() => resultJson.id}
                  showHeader
                  columns={tableColums}
                  dataSource={resultJson}
                  scroll={{ x: true }}
                />
              </Col>
            </Row>
          </div>
        </Form>
        <Drawer
          style={{ marginTop: "50px" }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleCreate: false })}
          visible={visibleCreate}
        >
          <NewUser {...this.props} closeUser={this.onCreate} isOpen />
        </Drawer>
        <Drawer
          style={{ marginTop: "50px" }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleEdit: false })}
          visible={visibleEdit}
        >
          <NewUser
            {...this.props}
            closeUser={this.onEdit}
            isOpen
            currentUser={currentUser}
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
            <Header className="headerStyle">{dictionary.USERS}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderUsers()}</div>
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
    return <>{isOpen ? this.renderUsers() : this.renderInFullScreen()}</>;
  }
}
export default Form.create()(FindUser);
