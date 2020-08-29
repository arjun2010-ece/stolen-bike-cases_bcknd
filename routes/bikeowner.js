const express = require("express");
const router = express.Router();

//controllers
 const { read, list, remove, update, create } = require("../controllers/bikeowner");

 
router.get("/bikes/owner/:id",read);
router.delete("/bikes/owner/:id",remove);
router.patch("/bikes/owner/:id",update);
router.get("/bikes/owners",list);
router.post("/bikes/owners",create);



module.exports = router;