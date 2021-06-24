
var AppConstants = require('../../constants/AppConstants');
const jwt = require("jsonwebtoken")
const db = require('../../_helpers/db');
const config = require("../../config.json")
var crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { resolve } = require('path');
const User = db.User;

function UserApi(){};


UserApi.prototype.handleUserData = function (req ,res){
    var action = req.query.action;
    switch(action){
        case "registerUserData":
            new UserApi().registerUserData(req ,res);
            break;
            case "requestStudentData":
                new UserApi().requestStudentData(req ,res);
                break;
                case "userLogin":
                   new UserApi().authenticationUser(req ,res )
                    break;
            default:
                res.send("no data");
    };
}

UserApi.prototype.authenticationUser = async function (req ,res ,next){
    var reqData =req.body;
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
}


UserApi.prototype.requestStudentData = async function (req ,res ,next){
    var userObj =req.body;
    //Dupplicate check User
    const _findUserVali = await validationDupplicateUserData(userObj);
    if(_findUserVali.length == 0){
        const user = new User(userObj);
        if(userObj.password){
            user.hash = await hashPassword(userObj.password);  
          }
          if(await user.save()){
            res.status(200).json(AppConstants.USER_SAVE_MESSAGE);
        }; 
    }else{
        res.status(500).json({message:AppConstants.USER_Failed_MESSAGE , _findUserVali });
    }
}

UserApi.prototype.registerUserData = async function (req ,res ,next){
    var userObj =req.body;
 
    switch(userObj.role){
        case AppConstants.STUDENT_ROLE:
            break;
            case AppConstants.STAFF_ROLE:
                break;
                case AppConstants.DUMMY_STUDENT:
                    const _findUserVali = await validationDupplicateUserData(userObj);
                   
                    if(_findUserVali.length == 0){
                    const user = new User(userObj);
                    if(userObj.password){
                        user.hash = await hashPassword(userObj.password);  
                    };
                  if(await user.save()){
                      res.status(200).json(AppConstants.USER_SAVE_MESSAGE)
                  };
                    }else{
                        res.status(500).json({message:AppConstants.USER_Failed_MESSAGE , _findUserVali });
                    }
                    break;
    }
}

//Nic, contact, email
async function validationDupplicateUserData(userObj){
    var _responArray = [];
    console.log(userObj)
    return new Promise(async(resolve)=>{
        const _userfind = await User.find({email:userObj.email});
        if(_userfind.length > 0){
            _responArray.push({message:AppConstants.EXISTING_EMAIL})
        }
 
        const _nicfind = await User.find({nic:userObj.nic});
        if(_nicfind.length > 0){
            _responArray.push({message:AppConstants.EXISTING_NICNUMBER})
        }
        // const _contactfind = await User.find({userMobile:userObj.userMobile});
        // if(_contactfind.length > 0){
        //     _responArray.push({message:AppConstants.EXISTING_CONTACT_NUMBER})
        // }  
        resolve(_responArray)
    })
}

function hashPassword(password) {
    return new Promise((resolve) => {
        bcrypt.hash(password, 10, (err, hash) => {
            resolve(hash);
        });
    });
}

module.exports = new UserApi();