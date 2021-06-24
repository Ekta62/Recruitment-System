const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require('../_helpers/db');
module.exports = router;
const Student = db.Student;
const User = db.User;




//router.patch('/updateStudent' , async(req ,res, next)=>{

   // return await Student.updateOne({id:req.body.id}, {$set:req.body},function(err ,result){
    //    if(err){
            //res.status(500).json(err)
      //  }else if(result){
           // res.status(200).json(result)
       // }
//}) 


//})




//router.get('/getByIdStudent/:id' , async(req , res , next)=>{

    //const _id = req.params.id;
    //console.log(_id)
    //return await Student.find({_id:_id},function(err ,result){
    //if(err){
        //res.status(500).json(err)
    //}else if(result){
       // res.status(200).json(result)
   // }
   // })


//})

//outer.get('/getStudent', async(req, res, next)=>{
    //console.log('H')
         //await Student.find({},function(err , result){
            //if(err){
               // res.status(500).json(err)
             //}else if(result){
                //res.status(200).json(result)
            // }
        // })
//})

router.post('/student-save', async(req ,res, next)=>{
    const _userData = req.body;

    if(await User.findOne({email:_userData.email})){
        res.status(500).json('Email is already insereted!')
    }else if(await Student.findOne({id:_userData.id , studentStatus:true},function(err,reuslt){
       if(reuslt){
           console.log(result + "1");
       }
    })){
        res.status(500).json('Email is already insereted!') 
    }else if(await Student.findOne({nicNumber: _userData.nicNumber},function(err,result){
        if(result){
            console.log(result + "2");
        }
    })){
        res.status(500).json('Email is already insereted!') 
    }
   
    await Student.find({ $or: [ { nicNumber: _userData.nicNumber }, { email: _userData.nicNumber } ,{ contactNumber: _userData.contactNumber}] },function(err , mainres){
        if(err){
            console.log(err);
        }else{
            console.log('length')
            console.log(mainres.length)
            if(mainres && mainres.length == 0){
               // console.log('dasdasd')
                let userData = {
                    firstName:_userData.firstName,
                    LastName:_userData.LastName,
                    fullName:_userData.firstName + _userData.LastName,
                    email:_userData.email,
                    password:String(_userData.password),
                    role:(_userData.studentType == 'Internal st')?'New':'Existing',
                    active:true,
                }
                console.log('userdata')
                console.log(userData)
          const user = new User(userData);
          if(userData.password){
            user.hash = bcrypt.hashSync(userData.password, 10);  
          }
          user.save()
          console.log("Methanata enwa")
          const Student = new Student(_userData);
          Student.save()
          res.status(200).json('data is done!')
          user.save()
        //   if(){
        //       console.log('dsds')
           
        // //    if( ) {
        // //        res.status(200).json('data is done!')
        // //    }else{
        // //     res.status(500).json('Faile save')
        // //    }
    
        // };
            // }else{
            //     res.status(500).json('Inserted data ') 
             }else{
                
                    res.status(500).json('Fail save')
                    
             }
        }
    })
  //return;
       
})