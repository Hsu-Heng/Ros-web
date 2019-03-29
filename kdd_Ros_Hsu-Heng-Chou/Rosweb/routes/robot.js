var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Workstation = mongoose.model('Workstation');
var robot = mongoose.model('robot');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var name = "";
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
         name = doc["workstation"]
         console.log(name);
         res.render('robot.html',{"h1_header":name});
       } else {
         console.log("no data exist for this id");
         res.render('robot.html');
       }
    })
   .catch((err) => {
    res.render('robot.html');
     console.log(err);
    });  
});
router.get('/edit/:id/:rid', function(req, res, next) {
    var id = req.params.id;
    var rid = req.params.rid;
    console.log(rid)
    var name = "";
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
        var viewrobot = doc.robots.id(rid);
         
         console.log(viewrobot);
         res.json(viewrobot);
       } else {
         console.log("no data exist for this id");
         res.send('error');
       }
    })
   .catch((err) => {
    res.send('error');
     console.log(err);
    });  
});
router.get('/all/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id)
    var name = "";
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
       if (doc) {
         name = doc["workstation"]
         console.log(name);
         res.json(doc["robots"]);
       } else {
         res.json({"state":"error"});
       }
    })
   .catch((err) => {
    res.send('error');
     console.log(err);
    });  
});
router.post('/:id', function (req, res, next) {
    var id = req.params.id;
    console.log('I received a POST request');
    console.log(id);
    var nrobot = new robot({ 
        robotname: req.body.robotname, 
        robotIp: req.body.robotIp,
        robotTypr: req.body.robotTypr,
        });
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
        doc.robots.push(nrobot);
        doc.save(function (err) {
            if (err){
                console.log("fail");
                res.send('error');
            } 
            else{
                console.log("save");
                res.send('yes');
            }
            // saved!
            });
    })
    .catch((err) => {
        res.send('error');
         console.log(err);
        }); 
    
  console.log(req.body);

});
router.delete('/:id/:robotid', function (req, res) {
    var id = req.params.id;
    var rbid = req.params.robotid;
    console.log(rbid);
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
        doc.robots.pull({ _id: rbid })
        
        doc.save(function (err) {
            if (err){
                console.log("fail");
                res.send('error');
            }
            else{
                console.log("save");
                res.send('yes');
            } 
            });
    })
    .catch((err) => {
        res.send('error');
         console.log(err);
        }); 
  
  });

router.put('/:id/:robotid', function (req, res) {
    var id = req.params.id;
    console.log(req.body);
    var rid = req.body._id;
    var nrobotname = req.body.robotname;
    var nrobotIp = req.body.robotIp;
    var nrobotTypr= req.body.robotTypr;
    Workstation.findOne({ _id: id }) 
    .then((doc) => {
        doc.robots.id(rid).robotname = nrobotname;
        doc.robots.id(rid).robotIp = nrobotIp;
        doc.robots.id(rid).robotTypr = nrobotTypr;
            doc.save(function (err) {
                if (err){
                    console.log("fail");
                    res.send('error');
                }
                else{
                    console.log("save");
                    res.send('yes');
                } 
                });
              
    })
    .catch((err) => {
        res.send('error');
         console.log(err);
        }); 
  
  });
module.exports = router;