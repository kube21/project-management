import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserComponent from '../../components/users/newUsers';
import { getAllUsers, createUser, updateUser } from '../../redux/actions/user.action';
import { getAllProjects } from '../../redux/actions/project.action';

const mapStateToProps = state => ({
  userResponse: state.User.userResponse,
  createResponse: state.User.createResponse,
  projectResponse: state.Project.projectResponse,
  updateResponse: state.User.updateResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllUsers, createUser, getAllProjects, updateUser }, dispatch);
};

const User = connect(mapStateToProps, mapDispatchToProps)(UserComponent);

export default User;
