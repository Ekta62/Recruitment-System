const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new mongoose.Schema({
    staffId:{
        type:String,
        required:true
    },
    id:{
        type:String,
    },
    staffType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    firstName:{
        type:String,
       
    },
    staffStatus : {
        type:Boolean
    },
    lastName:{
        type:String,
      
    },
    nicNumber:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    contactNumber:{
        type:Number,
       
    },
    emergencyNumber:{
        type:Number,
       
    },
    drvinLno:{
        type:String,
         
    },
    reason:{
        type:String,
         
    },
    address:{
        type:String,
       
    },
    birthday:{
        type:String,
        
    },
    age:{
        type:Number,
        
    },
    ingerd:{
        type:String,
    },
    gender:{
        type:String,
    },

    createdDate: {
        type: Date,
        default: Date.now

    },
    drivingInformation:[]

});
module.exports =mongoose.model('staff', StaffSchema);
