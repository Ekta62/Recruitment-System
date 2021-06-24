const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({

    companyId:{
        type:String,
        unique:true,
    },
    
    companyName:{
        type:String,
        
    },
    
    role:{
        type:String,
        
    },
    
    email:{
        type:String,
        unique:true,
    },
    
    active:{
        type:Boolean,
        
    },
    


});
schema.set('toJson' , {vituals:true});
module.exports = mongoose.model('company' , schema);