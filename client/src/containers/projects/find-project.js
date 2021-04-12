import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectComponent from '../../components/projects/FindProject';
import { getAllProjects, deleteProject } from '../../redux/actions/project.action';

const mapStateToProps = state => ({
  projectResponse: state.Project.projectResponse,
  projectDeleteResponse: state.Project.projectDeleteResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllProjects, deleteProject }, dispatch);
};

const Project = connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);

export default Project;
