const mongoose = require ('mongoose');
const StudentSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
    },
    gpaMark:{
        type:String,
        required:true
    },
    gradMark:{
        type:String,
        
    },
    active:{
        type:String,
       
    },
    email:{
        type:String,
        
    },
    universityName:{
        type:String,
    },
    address:{
        type:String,
       
    },
    createdDate: {
        type: Date,
        default: Date.now

    },
   

});
module.exports =mongoose.model('student', StudentSchema);