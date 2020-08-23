const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");
const Keywords = require("../models/keywords");

exports.create =  async (req, res) => {
    const { cname, keywords } = req.body;
    let category = new Category({ name: cname });
    const {_id } = await category.save();
    const keyArray = keywords.split(",").map(k => ({category:_id,name: k}));
    const result = await Keywords.insertMany(keyArray);
    console.log(ka);
    return res.json({
        message: "category is created...",
        data: result
    });
}

