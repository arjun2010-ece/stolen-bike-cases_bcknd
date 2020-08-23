const express = require("express");
const router = express.Router();

//controllers
 const { createAdmin, createUser } = require("../controllers/user");

 
router.post("/internal/admin", createAdmin);
router.post("/internal/users", createUser);


module.exports = router;