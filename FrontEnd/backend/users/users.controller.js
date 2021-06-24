const express = require('express');
const router = express.Router();
const db = require('../_helpers/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const config = require("../config.json")
module.exports = router;
// //Scehama import
const User = db.User;
const Company = db.Company
const Student = db.Student;
const Job = db.Job;
const ApplyJob = db.ApplyJob;
(path = require("path")),
  (exports.saveFile = async (req, res) => {
    const fileData = req.body;

    const saveFile = new file(fileData);
    try {
      await saveFile.save();
      res.status(201).json(saveFile);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });

router.post('/download', async (req, res) => {
  var fileName = req.body.originalName;
  var id = req.body["Uploaded folder name"].replace(/\s+/g, "_");
  res.download(path.join(`${config.dowloadPath}${id}/${fileName}`), (err) => {
    console.log(err);
  });

})


router.post('/downloadfile', async (req, res) => {
  var fileName = req.body.originalName;
  var id = req.body["Uploaded folder name"].replace(/\s+/g, "_");
  res.download(path.join(`${config.studentDonwloadPath}${id}/${fileName}`), (err) => {
    console.log(err);
  });

})

router.get('/get-by-id-job/:id', async(req ,res ,next)=>{
          if(req.params.id){

            await Job.find({vacnyId:req.params.id},function(err , result){
              if(err){
                res.status(500).json(err)
              }
              res.status(200).json(result)
          })

          }else{
            res.status(409).json('job id is empty')
          }
})

router.get('/load-job/:id' , async(req ,res, next)=>{
  if(req.params.id != '111'){
    await Job.find({companyemail:req.params.id},function(err , result){
      if(err){
        res.status(500).json(err)
      }
      res.status(200).json(result)
  })
  }else{
    await Job.find({},function(err , result){
      if(err){
        res.status(500).json(err)
      }
      res.status(200).json(result)
  })
  }
   
})

router.post('/create-job' , async(req ,res ,next)=>{
  const job = new Job(req.body.objjob);
  if(await job.save()){
    res.status(200).json('Vacancy created Successfully!')
}else{
  res.status(500).json('Vacancy is not created!')
};
})

router.post('/company-register' , async(req ,res ,next)=>{
  //console.log(req.body)
  const reqData = req.body.userDara;
  const comData = req.body.data;

  if(await User.findOne({email:reqData.email})){
    res.status(500).json('selected email is already inserted!Please insert different email address')
}
const user = new User(reqData);
const company = new Company(comData);
if(reqData.password){
  user.hash = bcrypt.hashSync(reqData.password, 10);  
}
if(await user.save() && await company.save()){
  res.status(200).json('company save done')
};
})
router.post('/register', async (req ,res ,next)=>{
    const reqData = req.body;
     console.log(req.body)
    if(await User.findOne({email:reqData.email})){
        res.status(500).json('selected email is already inserted!Please insert different email address')
    }
  const user = new User(reqData)
  const student = new Student(reqData)
  if(reqData.password){
    user.hash = bcrypt.hashSync(reqData.password, 10);  
  }
// save user
if(await user.save() && await student.save()){
    res.status(200).json('User save done')
};
});

router.post('/authenticate', async (req ,res ,next)=>{
  const reqData = req.body;
 // console.log(reqData)
  if(await User.findOne({email:reqData.email , active:false})){
      res.status(500).json('User is not Activated pleas contact admin department')
  }else if(!(await User.findOne({email:reqData.email}))){
    res.status(500).json('There is no sufficient user in the system')
  }
  const FindUser = await User.findOne({email:reqData.email});
  if(FindUser.active == true){
    if(FindUser && bcrypt.compareSync(reqData.password, FindUser.hash)){
          const {hash , ...userWithoutHash} = FindUser.toObject();
          const token = jwt.sign({sub:FindUser.id}, config.secret);
          res.status(200).json({
            ...userWithoutHash,
            token,
            errorStatus:false,
          })
          
    }
  }
  
});

router.post('/login', async (req, res, next)=>{
  const reqData = req.body;
  console.log('AWaw')
  if(await User.findOne({email:reqData.email})){
    res.status(500).json('Error')
  }
  const user = new User(reqData);
  if(reqData.password){
    user.hash = bcrypt.hashSync(reqData.password, 10);
  }
  if(await user.save()){
    res.status(200).json('User login done')
};

});

router.post('/create-apply-job' ,async(req ,res, next)=>{
  const applyJob = new ApplyJob(req.body.objjob)

  const _findApplied = await ApplyJob.find({StudentEmail:req.body.objjob.StudentEmail , name:req.body.objjob.name});

  if(_findApplied.length == 0){
  if(await applyJob.save()){
    res.status(200).json('Vacancy Applied Successfully!')
}else{
  res.status(500).json('Vacancy is not Applied!')
};
}else{
  res.status(500).json('Already you have apply for this vacanvy')
}
});


router.get('/get-apply-job/:id' , async(req ,res ,next)=>{
  await ApplyJob.find({vacnyId:req.params.id},function(err , result){
    if(err){
      res.status(500).json(err)
    }
    res.status(200).json(result)
})
})


router.get('/get-profile/:id' , async(req ,res ,next)=>{
  console.log('profile')
  await ApplyJob.find({_id:req.params.id},function(err , result){
    if(err){
      res.status(500).json(err)
    }
    res.status(200).json(result)
})
})


router.get('/get-student/:id' , async(req ,res ,next)=>{
//  console.log('profile')
  await Student.find({email:req.params.id},function(err , result){
    if(err){
      res.status(500).json(err)
    }
    res.status(200).json(result)
})
})

router.patch('/update-job/:id' , async(req ,res ,next)=>{
  console.log('profile')
  await ApplyJob.updateOne({_id:req.params.id} , {$set:{status:2}},function(err , result){
    if(err){
      res.status(500).json(err)
    }
    res.status(200).json(result)
})
})

router.get('/my-job/:id' , async(req ,res ,next)=>{
 // console.log('profile')
  await ApplyJob.find({StudentEmail:req.params.id},function(err , result){
    if(err){
      res.status(500).json(err)
    }
    res.status(200).json(result)
})
})


router.delete('/delete-job/:id' , async(req ,res ,next)=>{
  // console.log('profile')
   await Job.deleteOne({_id:req.params.id},function(err , result){
     if(err){
       res.status(500).json(err)
     }
     res.status(200).json(result)
 })
 })