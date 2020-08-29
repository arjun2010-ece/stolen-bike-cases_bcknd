const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var reportSchema = new mongoose.Schema({ 
    reportId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum : ['open','resolved', 'assigned'],
        default: 'open'
    },
    assignedTo: {
        type: ObjectId,
        ref: "Police_officer",
    },
    reportDate: {
        type: String,
        trim: true
    },
    stolenDate: {
        type: String,
        trim: true
    },
    reportedBy: {
        type: ObjectId,
        ref: "BikeOwner",
    }

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);

/*
reportedBy: {
    type: String,
    ref: "BikeOwner",
}
Normally we use objectId that means one table is attached to other table through objectID
but we are changing that so that one table is attached with other with "emailid" or "officer_id"
which are other columns of the table so here thype needs to change to string.
*/