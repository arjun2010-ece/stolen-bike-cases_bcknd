const express = require("express");
const router = express.Router();

//controllers
 const { readByQuery } = require("../controllers/keywords");

 
router.get("/words",readByQuery);


module.exports = router;