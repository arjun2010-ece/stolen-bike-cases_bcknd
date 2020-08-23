const { errorHandler } = require('../helpers/dbErrorHandler');
const Logs = require('../models/logs');

exports.fetchLogs = async (req, res) => {

  const { from = '', to = '', limit = '', skip = '' } = req.query;
  try {
  const logs = await Logs.find(
      from ? { timestamp: { $gte: from, $lte: to } } : {}, null, {limit: parseInt(limit), skip: parseInt(skip)}
  );
  return res.json({
    data: logss,
    status: 200,
    message: 'only from flag working',
  });
} catch (error) {
    // handle errors in catch blocks..
      console.log("error is present in fetchLogs catch block :", error.message);
      res.send({"error is present in fetchLogs catch block ": error.message});
}

};

exports.fetchByLogId = async (req, res) => {
  const id = req.params.uuid;
  const result = await Logs.find({ UUIDv4 : id }).exec();
  return res.json({
    result,
    message: 'Got it..',
  });
};
