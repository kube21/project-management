import axiosCall from "./index";
import types from "./action-types";
import URL from "../../config/routes";
import { standardDate } from "../../utils/utils";

export const getAllProjects = () => {
  const path = URL.GET_ALL_PROJECTS;
  const responseType = types.GET_ALL_PROJECTS;
  return axiosCall("get", path, responseType);
};

export const saveProject = (data) => {
  data.endDate = standardDate(data.endDate);
  data.startDate = standardDate(data.startDate);
  const path = URL.GET_ALL_PROJECTS;
  const responseType = types.CREATE_PROJECT;
  return axiosCall("post", path, responseType, data);
};

export const updateProject = (data) => {
  data.endDate = standardDate(data.endDate);
  data.startDate = standardDate(data.startDate);
  const path = `${URL.GET_ALL_PROJECTS}/${data.id}`;
  const responseType = types.UPDATE_PROJECT;
  return axiosCall("put", path, responseType, data);
};

export const deleteProject = (id) => {
  const path = `${URL.GET_ALL_PROJECTS}/${id}`;
  const responseType = types.DELETE_PROJECT_BY_ID;
  return axiosCall("delete", path, responseType);
};
