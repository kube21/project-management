import types from "../actions/action-types";

export default (state = [], action) => {
  switch (action.type) {
    case types.GET_ALL_PROJECTS:
    case `${types.GET_ALL_PROJECTS}_REJECTED`:
      return {
        ...state,
        projectResponse: action.updatePayload,
      };
    case types.DELETE_PROJECT_BY_ID:
    case `${types.DELETE_PROJECT_BY_ID}_REJECTED`:
      return {
        ...state,
        projectDeleteResponse: action.updatePayload,
      };
    case types.CREATE_PROJECT:
    case `${types.CREATE_PROJECT}_REJECTED`:
      return {
        ...state,
        projectCreateResponse: action.updatePayload,
      };
    case types.UPDATE_PROJECT:
    case `${types.UPDATE_PROJECT}_REJECTED`:
      return {
        ...state,
        projectUpdateResponse: action.updatePayload,
      };
    default:
      return state;
  }
};
