import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SidebarComponent from '../../components/common/sidebar';

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const Sidebar = connect(
  // mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);

export default Sidebar;
