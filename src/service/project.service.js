const project = require("../model/project.model");
const baseDao = require("../dao/base.dao");
const response = require("../utils/response");

exports.createProject = async (body) => {
  let resut = await baseDao.create(project, body);
  if (!resut) {
    return response.badRequest();
  }
  return response.success(resut);
};

exports.getAllProject = async () => {
  let resut = await baseDao.findAll(project);
  if (!resut) {
    return response.error();
  }
  return response.success(resut);
};

exports.updateProject = async (id, body) => {
  let resut = await baseDao.findOneAndUpdate(project, id, body);
  if (!resut) {
    return response.notFound();
  }
  return response.success(resut);
};

exports.deleteProject = async (id) => {
  const body = { isDeleted: true };
  let resut = await baseDao.findOneAndUpdate(project, id, body);
  if (!resut) {
    return response.notFound();
  }
  return response.deleted();
};
