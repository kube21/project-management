const router = require("express").Router();
const project = require("../controller/task.controller");

// Create a new Project
router.post("/", project.createTask);

// Retrieve all Project
router.get("/", project.getAllTasks);

// Update a Project with object id
router.put("/:id", project.updateTask);

// Delete Project by id
router.delete("/:id", project.deleteTask);

module.exports = router;
