const taskService = require("../service/task.service");

/**
 * create a task
 * @param req
 * @param res
 * @posts
 **/
exports.createTask = async (req, res) => {
  const task = await taskService.createTask(req.body);
  res.status(task.statusCode).json(task);
};

/**
 * get all users
 * @param req
 * @param res
 * @get
 */
exports.getAllTasks = async (req, res) => {
  const task = await taskService.getAllTasks();
  res.status(task.statusCode).json(task);
};

/**
 * update task by object id
 * @param req
 * @param res
 * @put
 */
exports.updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.status(task.statusCode).json(task);
};

/**
 * delete task by object id
 * @param req
 * @param res
 * @delete
 */
exports.deleteTask = async (req, res) => {
  const task = await taskService.deleteTask(req.params.id);
  res.status(task.statusCode).json(task);
};
