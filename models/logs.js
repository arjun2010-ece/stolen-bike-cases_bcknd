const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var logsSchema = new mongoose.Schema({ 
    timestamp: {
        type: String,
        trim: true,
        required: true
    },
    UUIDv4: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Logs", logsSchema);