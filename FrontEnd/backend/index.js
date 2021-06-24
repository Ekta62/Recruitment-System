require('rootpath')();
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require ('mongoose')
var express = require('express');
const route = require("./routes/routes");
var app = express();
const shell = require("shelljs");
const path = require("path");
var multer = require("multer");
const config = require("./config.json");

app.use(cors());
app.use(cors({ origin: config.prodEnvironment }));
app.use(bodyParser.json({ limit: config.bodyParser }));

app.use('/users', require('./users/users.controller'));
app.use('/staff', require('./users/staff.controller'));
app.use('/student',require('./users/student.controller'));

var Prostorage = multer.diskStorage({
  
    destination:function(req, file , cb){
    
      let str = req.params.id;
       // console.log(str)
      const dir = config.dowloadPath + str;
    //  console.log(dir)
      let destination = path.join(__dirname, dir); //uploading
      // let destination = path.join(dir);
     
      shell.mkdir('-p',dir);
      destination =path.join(destination, '',req.params.id);
     // console.log(destination)
      const pathdsd =  config.dowloadPath + req.params.id;
      
      cb(null, pathdsd);
   
    },
    filename:function(req, file, cb) {
        console.log(file)
      var datetimestamp = Date.now();
      cb(null, file.originalname);
  }
  })


  var Profilestorage = multer.diskStorage({
  
    destination:function(req, file , cb){
    
      let str = req.params.id;
       // console.log(str)
      const dir = config.studentDonwloadPath + str;
    //  console.log(dir)
      let destination = path.join(__dirname, dir); //uploading
      // let destination = path.join(dir);
     
      shell.mkdir('-p',dir);
      destination =path.join(destination, '',req.params.id);
     // console.log(destination)
      const pathdsd =  config.studentDonwloadPath + req.params.id;
      
      cb(null, pathdsd);
   
    },
    filename:function(req, file, cb) {
        console.log(file)
      var datetimestamp = Date.now();
      cb(null, file.originalname);
  }
  })

var projectUpload = multer({
    storage: Prostorage,
  }).single("file");

  
var projectfileupload = multer({
  storage: Profilestorage,
}).single("file");


app.post("/projectupload/:id" , function(req, res) {
  
    projectUpload(req, res, function (err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      } else {
        return res.json();
      }
    });
  })

  
  app.post("/projectfileupload/:id" , function(req, res) {
  
    projectfileupload(req, res, function (err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      } else {
        return res.json();
      }
    });
  })
  

app.listen('3000', function () {
    console.log('running on 3000...');

    
});




