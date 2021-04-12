import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectComponent from '../../components/projects/newProject';
import { getAllUsers } from '../../redux/actions/user.action';
import { saveProject, updateProject } from '../../redux/actions/project.action';

const mapStateToProps = state => ({
  projectResponse: state.Project.projectResponse,
  userResponse: state.User.userResponse,
  projectCreateResponse: state.Project.projectCreateResponse,
  projectUpdateResponse: state.Project.projectUpdateResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllUsers, saveProject, updateProject }, dispatch);
};

const Project = connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);

export default Project;
