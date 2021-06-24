const express=require('express');
const router=express.Router();
const userAPI=require('../routes/api/user-api');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Here we are handling the get request for the products"
    });
});


router.route('/user-api').post(userAPI.handleUserData);


module.exports=router;