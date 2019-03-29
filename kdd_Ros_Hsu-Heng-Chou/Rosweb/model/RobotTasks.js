const mongoose = require('mongoose');
const navgoal = new mongoose.Schema({
    startAt: {type: Date, default: Date.now},
    endAt: {type: Date, default: Date.now},
    goal: {
      type: [Number],
      required: true
    }
  });

const RobotTasks = new mongoose.Schema({
    robotname: String,
    workstation: String,
    State: Boolean,
    Tasks: [navgoal],
    creatAt: {type: Date, default: Date.now}

  });

module.exports = mongoose.model("RobotTasks",RobotTasks);