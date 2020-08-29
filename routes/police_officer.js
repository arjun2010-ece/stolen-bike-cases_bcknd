const express = require("express");
const router = express.Router();

//controllers
 const { read, list, remove, update, create } = require("../controllers/police_officer");

 
router.get("/case/officer/:id",read);
router.delete("/case/officer/:id",remove);
router.patch("/case/officer/:id",update);
router.get("/case/officers",list);
router.post("/case/officers",create);



module.exports = router;