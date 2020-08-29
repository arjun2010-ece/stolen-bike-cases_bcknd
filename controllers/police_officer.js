const { errorHandler } = require('../helpers/dbErrorHandler');
const Police_officer = require('../models/police_officer');
const Report = require('../models/report');
const moment = require("moment");

exports.create = (req, res) => {
  const po = new Police_officer(req.body);
  po.save((err, data) => {
    if (err || !data) {
      return res.json({
        message: errorHandler(err),
      });
    }

    return res.json({
      data,
      message: 'Police officer created',
    });
  });
};

exports.update = async (req, res) => {
  try {
    const dt = moment(new Date()).format("YYYY-MM-DD hh:mm:ss.SSS");
    const policeOfficer = await Police_officer.findOneAndUpdate({ _id: req.params.id },
        { isAssigned: req.body.isAssigned, last_resolved_date: dt }, { new: true});
    const {officer_id, isAssigned, _id} = policeOfficer[0];

    if(!isAssigned){
      Report.findByIdAndUpdate({ assignedTo: _id, status: "assigned" },{ status : "resolved" }, { new: true});
      const openReport = await Report.find({status: "open"});
      if(openReport && openReport.length > 0){
        const {_id} = openReport[0];
        await Report.findByIdAndUpdate(_id, { assignedTo: officer_id, status:"assigned" }, { new: true});
      }
    }
    return res.status(200).json({
      message: "The Police officer has updated its response."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Police_officer.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: "The Police officer was deleted."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const policeOfficer = await Police_officer.find({});
    return res.status(200).json({
      policeOfficer,
      message: "All the police Officer lists."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const policeOfficer = await Police_officer.find({_id: req.params.id});
    return res.status(200).json({
      policeOfficer,
      message: "Single police Officer details."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};
