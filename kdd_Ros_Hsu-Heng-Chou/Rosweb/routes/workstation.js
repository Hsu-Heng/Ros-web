var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Workstation = require('./model/Workstation');
var bodyParser = require('body-parser');

var Workstation = mongoose.model('Workstation');
var robot = mongoose.model('robot');
router.get('/', function(req, res, next) {
    res.render('workstation.html');
  });
  router.get('/all', function(req, res, next) {
    Workstation.find({}, function (err, docs) {
        if(!Workstation){
            res.json(404,{msg:'newss not found'});
        }else{
            res.json(docs);
        }
      })

    console.log('I received a GET request');
    
  });


router.post('/', function (req, res) {
    console.log('I received a POST request');
    console.log(req.body.workstation);
    var nrobot = new robot()
    var newworkstation = new Workstation({ 
        workstation: req.body.workstation, 
        VPNkey: req.body.VPNkey,
        VPNHost: req.body.VPNHost,
        VPNPassword: req.body.VPNPassword,
        robots:[nrobot],
        });
        console.log(newworkstation);
    newworkstation.save(function (err) {
        if (err) console.log("fail");
        else console.log("save");
        // saved!
        });
  console.log(req.body);

});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  Workstation.findByIdAndRemove(id, (err) => {
    if(err) {
      return next(new Error('Todo was not found!'));
    }
    res.json('Successfully removed');
  });

});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
        res.json(doc);
       } else {
        res.json("error");
       }
    })
   .catch((err) => {
    res.json("error");
    });
  
});


router.put('/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.workstation);
  res.json("data");
  Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
        doc.workstation = req.body.workstation; 
        doc.VPNkey= req.body.VPNkey;
        doc.VPNHost= req.body.VPNHost;
        doc.VPNPassword= req.body.VPNPassword;
        doc.save();
       } else {
        
       }
    })
   .catch((err) => {
    
    });
});
module.exports = router;