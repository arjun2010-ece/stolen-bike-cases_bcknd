const express = require("express");
const router = express.Router();

//controllers
 const { fetchLogs, fetchByLogId } = require("../controllers/logs");

 
router.get("/public/logs",fetchLogs);
router.get("/public/logs/:uuid",fetchByLogId);



module.exports = router;