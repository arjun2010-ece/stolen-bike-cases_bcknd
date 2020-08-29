const express = require("express");
const router = express.Router();

//controllers
 const { list, create } = require("../controllers/report");

 
// router.get("/case/report/:id",read);
// router.delete("/case/report/:id",remove);
// router.patch("/case/report/:id",update);
router.get("/case/reports",list);
router.post("/case/reports",create);



module.exports = router;