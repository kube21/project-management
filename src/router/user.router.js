const router = require("express").Router();
const user = require("../controller/user.controller");

// Create a new User
router.post("/", user.createUser);

// Retrieve all Users
router.get("/", user.getAllUser);

// Update a User with object id
router.put("/:id", user.updateUser);

// Delete user by id
router.delete("/:id", user.deleteUser);

module.exports = router;
