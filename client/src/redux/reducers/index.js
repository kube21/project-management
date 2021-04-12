import { combineReducers } from 'redux';
import Project from './project.reducer';
import User from './user.reducer';

const rootReducer = combineReducers({
  Project,
  User,
});

export default rootReducer;
