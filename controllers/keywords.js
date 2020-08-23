const { errorHandler } = require("../helpers/dbErrorHandler");
const Keywords = require("../models/keywords");
const Category = require("../models/category");


exports.readByQuery = async (req, res) => {

    const cdata = await Category.find({ name: req.query.cname }).exec();
    const {_id} = cdata[0];
    const kdata = await Keywords.find({ category: _id }).exec();
    res.send(kdata);
}