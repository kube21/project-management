import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserComponent from '../../components/users/findUser';
import { getAllUsers, deleteUser } from '../../redux/actions/user.action';

const mapStateToProps = state => ({
  userResponse: state.User.userResponse,
  deleteResponse: state.User.deleteResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllUsers, deleteUser }, dispatch);
};

const User = connect(mapStateToProps, mapDispatchToProps)(UserComponent);

export default User;
