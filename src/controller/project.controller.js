const projectService = require("../service/project.service");

/**
 * create a project
 * @param req
 * @param res
 * @posts
 **/
exports.createProject = async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(project.statusCode).json(project);
};

/**
 * get all project
 * @param req
 * @param res
 * @get
 */
exports.getAllProject = async (req, res) => {
  const project = await projectService.getAllProject();
  res.status(project.statusCode).json(project);
};

/**
 * update project by object id
 * @param req
 * @param res
 * @put
 */
exports.updateProject = async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  res.status(project.statusCode).json(project);
};

/**
 * delete project by object id
 * @param req
 * @param res
 * @delete
 */
exports.deleteProject = async (req, res) => {
  const project = await projectService.deleteProject(req.params.id);
  res.status(project.statusCode).json(project);
};
