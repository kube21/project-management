const users = require("./user.router");
const project = require("./project.router");
const tasks = require("./tasks.router")

module.exports = (app) => {
  app.use("/api/v1/user", users);
  app.use("/api/v1/project", project);
  app.use("/api/v1/task", tasks);
};
