const mongoose = require('mongoose');
const pointSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    point: {
      type: [Number],
      required: true
    }
  });

const RobotPostition = new mongoose.Schema({
    robotname: String,
    workstation: String,
    robotIp: String,
    location: [pointSchema],
    creatAt: {type: Date, default: Date.now}

  });

module.exports = mongoose.model("RobotPostition",RobotPostition);