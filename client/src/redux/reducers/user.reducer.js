import types from "../actions/action-types";

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_USERS:
    case `${types.GET_ALL_USERS}_REJECTED`:
      return {
        ...state,
        userResponse: action.updatePayload,
      };
    case types.CREATE_USER:
    case `${types.CREATE_USER}_REJECTED`:
      return {
        ...state,
        createResponse: action.updatePayload,
      };
    case types.UPDATE_USER:
    case `${types.UPDATE_USER}_REJECTED`:
      return {
        ...state,
        updateResponse: action.updatePayload,
      };
    case types.DELETE_USER_BY_ID:
    case `${types.DELETE_USER_BY_ID}_REJECTED`:
      return {
        ...state,
        deleteResponse: action.updatePayload,
      };

    default:
      return state;
  }
};
