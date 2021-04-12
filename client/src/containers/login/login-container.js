import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginComponent from '../../components/login';
import { login } from '../../redux/actions/auth.action';

const mapStateToProps = state => ({
  loginResponse: state.Auth.loginResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default Login;
