const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var bikeOwnerSchema = new mongoose.Schema({ 
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    contactNumber: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("BikeOwner", bikeOwnerSchema);