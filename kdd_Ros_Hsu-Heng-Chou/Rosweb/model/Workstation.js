const mongoose = require('mongoose');
console.log('1111');
const robot = new mongoose.Schema({
    robotname: String,
    robotIp: String,
    robotTypr: String,
    timestamp: {type: Date, default: Date.now},
  });
  console.log('222');
  module.exports = mongoose.model("robot",robot);
const WorkstationSchema = new mongoose.Schema({
    workstation: String,
    VPNkey: String,
    VPNHost: String,
    VPNPassword: String,
    robots:[robot],
    creatAt: {type: Date, default: Date.now},
    upDateAt: {type: Date, default: Date.now}


  });
  console.log('333');
// module.exports = { schema: WorkstationSchema, model: Workstation};

module.exports = mongoose.model("Workstation",WorkstationSchema);
console.log('22444');