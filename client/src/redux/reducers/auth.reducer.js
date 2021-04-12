import types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.SIGN_UP:
    case `${types.SIGN_UP}_REJECTED`:
      return {
        ...state,
        signUpResponse: action.updatePayload
      };

    case types.LOGIN:
    case `${types.LOGIN}_REJECTED`:
      return {
        ...state,
        loginResponse: action.updatePayload
      };

    default:
      return state;
  }
};
