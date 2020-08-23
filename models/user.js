const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

var userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    token: {
        type: String,
        trim: true,
        required: true,
        default: "320ca9c4-ed20-4f09-bcb8-9b34b976b50"
    },
    permissions: {
        type: Array,
        trim: true,
        default: []
    },
    role: {
        type: String,
        required: true,
        enum : ['user','admin'],
        default: 'admin'
    },
    createdBy: {
        type: String,
        trim: true
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);