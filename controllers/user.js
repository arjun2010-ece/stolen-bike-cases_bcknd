const { errorHandler } = require('../helpers/dbErrorHandler');
const User = require('../models/user');

exports.createAdmin = (req, res) => {
  const admin = new User(req.body);
  admin.save((err, data) => {
    if (err || !data) {
      return res.json({
        message: errorHandler(err),
      });
    }

    return res.json({
      data,
      message: 'Admin created',
    });
  });
};

exports.createUser = async (req, res) => {
  try {
    const incomingToken = req.headers['token'];
    const admin = await User.find({ token: incomingToken });
    const permissions = req.body.permissions;
    // permission should either be read and write
    // show error incase you have different with error object.
    permissions.forEach((p) => {
      if (!['read', 'create'].includes(p)) {
        throw new Error('Permission can only be read and create');
      }
    });
    const { _id } = admin[0];
    // return res.send(_id)
    if (admin[0]) {
      const user = new User(req.body);
      user['createdBy'] = _id;
      //no need to have save() callback as any error there will be handled in catch block...
      const data = await user.save();
      return res.json({
        data,
        message: 'Admin created',
      });
    }
  } catch (error) {
    console.log('Error is: ', error.message);
    res.status(500).send({ message: 'Error is: ' + error.message });
  }
};
