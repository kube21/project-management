const task = require("../model/task.model");
const baseDao = require("../dao/base.dao");
const response = require("../utils/response");

exports.createTask = async (body) => {
  let result = await baseDao.create(task, body);
  if (!result) {
    return response.badRequest();
  }
  return response.success(result);
};

exports.getAllTasks = async () => {
  let result = await baseDao.findAll(task);
  if (!result) {
    return response.error();
  }
  return response.success(result);
};

exports.updateTask = async (id, body) => {
  let result = await baseDao.findOneAndUpdate(task, id, body);
  if (!result) {
    return response.notFound();
  }
  return response.success(result);
};

exports.deleteTask = async (id) => {
  const body = { isDeleted: true };
  let result = await baseDao.findOneAndUpdate(task, id, body);
  if (!result) {
    return response.notFound();
  }
  return response.deleted();
};
