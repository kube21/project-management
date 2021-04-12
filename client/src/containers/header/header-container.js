import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommonHeader from '../../components/common/header';

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const Header = connect(
  // mapStateToProps,
  mapDispatchToProps
)(CommonHeader);

export default Header;
