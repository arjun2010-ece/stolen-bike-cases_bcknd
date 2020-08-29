const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var policerOfficerSchema = new mongoose.Schema({ 
    officer_id: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    isAssigned: {
        type: Boolean,
        required: true
    },
    last_resolved_date: {
        type: String,
        trim: true,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Police_officer", policerOfficerSchema);