const { errorHandler } = require('../helpers/dbErrorHandler');
const BikeOwner = require('../models/bikeowner');

exports.create = (req, res) => {
  const bo = new BikeOwner(req.body);
  bo.save((err, data) => {
    if (err || !data) {
      return res.json({
        message: errorHandler(err),
      });
    }

    return res.json({
      data,
      message: 'Bike owner created',
    });
  });
};

exports.update = async (req, res) => {
  try {
    const newBikeOwner = await BikeOwner.findOneAndUpdate({ _id: req.params.id },{ $set : req.body }, { new: true});
    return res.status(200).json({
      newBikeOwner,
      message: "The BO was updated."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await BikeOwner.findByIdAndRemove(req.params.id);
    return res.status(200).json({
      message: "The BO was deleted."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const newBikeOwner = await BikeOwner.find({});
    return res.status(200).json({
      newBikeOwner,
      message: "All the BO lists."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const newBikeOwner = await BikeOwner.find({_id: req.params.id});
    return res.status(200).json({
      newBikeOwner,
      message: "All the BO lists."
    })
  } catch (error) {
    console.log('Error is: ', error.message);
    return res.status(500).send({ message: 'Error is: ' + error.message });
  }
};
