/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Modal,
  Spin,
  message,
} from "antd";
import Header from "../../containers/header/header-container";
import dictionary from "../../config/static/Dictionary";
import { compareObjects } from "../../utils/utils";
import { setAuthToken } from "../../services/auth";
import "./login.scss";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      location: [],
    };
  }

  UNSAFE_componentWillMount() {
    const { location } = this.props;
    if (location.search === "?status=false") {
      message.success(dictionary.LOGOUT_SUCCESSFUL_MSG);
    }
  }

  async componentDidMount() {
    const { history } = this.props;
    const user = await localStorage.getItem("userDetails");
    if (user) {
      history.push("dashboard");
    }
    this.setState({ isLoading: false });
  }

  componentDidUpdate(prevProps) {
    const { loginResponse, history } = this.props;
    if (compareObjects(loginResponse, prevProps.loginResponse)) {
      if (loginResponse && loginResponse.success) {
        if (loginResponse.data.position === "MANAGER") {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(loginResponse.data)
          );
          localStorage.setItem("token", loginResponse.token);
          setAuthToken();
          history.push("dashboard");
        } else {
          Modal.error({
            onCancel: this.setState({ isLoading: false }),
            title: "Error",
            content: "You are not authorised to login as a admin",
          });
        }
      } else if (loginResponse && loginResponse.message) {
        Modal.error({
          onCancel: this.setState({ isLoading: false }),
          title: "Error",
          content: loginResponse.message,
        });
      }
    }
  }

  handleSubmit = (e) => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await Object.keys(values).forEach(
          (key) => !values[key] && delete values[key]
        );
        this.setState({ isLoading: true });
        login(values);
      }
    });
  };

  render() {
    const { isLoading } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Spin size="large" spinning={isLoading} tip={dictionary.LOADING_MSG}>
        <Header />
        <div className="login-full">
          <div className="login-block">
            <h2 className="centerText">Login</h2>
            <Form
              onSubmit={() => this.handleSubmit(window.event)}
              className="login-form"
            >
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: dictionary.INPUT_USER_NAME_MSG },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={dictionary.USER_NAME_MSG}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: dictionary.INPUT_PASSWORD_MSG },
                  ],
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder={dictionary.PASSWORD_MSG}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true,
                })(<Checkbox>{dictionary.REMEMBER_ME_LABEL}</Checkbox>)}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Form.create({ name: "login_form" })(LoginComponent);
