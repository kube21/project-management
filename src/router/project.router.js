const router = require("express").Router();
const project = require("../controller/project.controller");

// Create a new Project
router.post("/", project.createProject);

// Retrieve all Project
router.get("/", project.getAllProject);

// Update a Project with object id
router.put("/:id", project.updateProject);

// Delete Project by id
router.delete("/:id", project.deleteProject);

module.exports = router;
