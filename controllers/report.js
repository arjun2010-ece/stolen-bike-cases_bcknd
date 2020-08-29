const { errorHandler } = require('../helpers/dbErrorHandler');
const Report = require('../models/report');
const Police_officer = require('../models/police_officer');
const BikeOwner = require('../models/bikeowner');

exports.create = async (req, res) => {
    try {
    const {reportId, name, description, type, status, reportDate, stolenDate, reportedBy} = req.body;
    const report = new Report({reportId, name, description, type, status, reportDate, stolenDate});
    const po = await Police_officer.find({ isAssigned: false}).sort({ last_resolved_date: "asc" });
  if(po && po.length > 0){
    const {_id} = po[0];
    report.assignedTo = _id;
    report.status = "assigned";
    await Police_officer.findByIdAndUpdate({_id},{ isAssigned : true }, { new: true});
  }
  else{
    report.assignedTo = "undefined";
  }
  const bo = await BikeOwner.find({ email: reportedBy });
  if(bo && bo.length > 0){
    const {_id} = bo[0];
    report.reportedBy = _id;
    const newReport = await report.save();
    return res.json({
        po: newReport,
        message: 'New generated report',
      });
  }
  else{
      throw new Error("User with that email doesnot exist in the system.");
  }
  
} catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
}

};

// exports.update = async (req, res) => {
//   try {
//     const report = await Report.findOneAndUpdate({ _id: req.params.id },{ $set : req.body }, { new: true});
//     return res.status(200).json({
//       report,
//       message: "The report was updated."
//     })
//   } catch (error) {
//     console.log('Error is: ', error.message);
//     return res.status(500).send({ message: 'Error is: ' + error.message });
//   }
// };

// exports.remove = async (req, res) => {
//   try {
//     await Report.findByIdAndRemove(req.params.id);
//     return res.status(200).json({
//       message: "The report was deleted."
//     })
//   } catch (error) {
//     console.log('Error is: ', error.message);
//     return res.status(500).send({ message: 'Error is: ' + error.message });
//   }
// };

exports.list = async (req, res) => {
  try {
    const reports = await Report.find({});
    return res.status(200).json({
      reports,
      message: "All reports lists."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

// exports.read = async (req, res) => {
//   try {
//     const report = await Report.find({_id: req.params.id});
//     return res.status(200).json({
//         report,
//         message: "Single report details."
//     })
//   } catch (error) {
//     console.log('Error is: ', error.message);
//     return res.status(500).send({ message: 'Error is: ' + error.message });
//   }
// };
