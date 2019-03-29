var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Workstation = mongoose.model('Workstation');
var robot = mongoose.model('robot');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('robotindex.html');
});
router.get('/control/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id)
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
         res.render('robotcontrol.html',{"workstation":doc["workstation"], "host":doc["VPNHost"], "key":doc["VPNkey"], "password":doc["VPNPassword"]  });
       } else {
         console.log("no data exist for this id");
         res.render('robotcontrol.html');
       }
    })
    .catch((err) => {
        res.render('robotindex.html');
         console.log(err);
        }); 
  });

module.exports = router;
