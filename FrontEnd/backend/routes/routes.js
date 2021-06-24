const express=require('express');
const router=express.Router();
const userAPI=require('../routes/api/user-api');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Here we are handling the get request for the products"
    });
});

//user kenek mona redda karath me api eka call karanne
router.route('/user-api').post(userAPI.handleUserData);


module.exports=router;