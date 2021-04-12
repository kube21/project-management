import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./containers/login/login-container";
import Projects from "./containers/projects/find-project";
import NewProject from "./containers/projects/new-project";
import CreateUser from "./containers/users/new-user";
import Users from "./containers/users/find-user";
import { isLoggedIn } from "./services/auth";
import Dictionary from "./config/static/Dictionary";

const history = createBrowserHistory();

export default class Routes extends Component {
  async UNSAFE_componentWillMount() {
    // const { pathname } = window.location;
    // const logged = await isLoggedIn();
    // const allow = Dictionary.WHITE_LISTED_ROUTES.includes(pathname);
    // if (!logged && !allow) {
    //   history.push('/login');
    // }
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Projects} />
          <Route path="/projects" component={Projects} />
          <Route path="/create-project" component={NewProject} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/users" component={Users} />
        </Switch>
      </Router>
    );
  }
}
