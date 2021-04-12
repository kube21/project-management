import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middleware = applyMiddleware(thunk);

export default function configureStore() {
  return createStore(rootReducer, middleware);
}
