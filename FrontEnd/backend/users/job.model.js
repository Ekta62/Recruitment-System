const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    vacnyId: {
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
    ,
    companyName:{
        type:String,
        required:true,
    }
    ,
    companyId:{
        type:String,
        required:true,
    }
    ,
    companyemail:{
        type:String,
        required:true,
    },
    note:{
        type:String,
        required:true,
    }
    ,
    fileName:{
        type:String,
        required:true,
    },
    file:{
        type:String,
    }
    ,
    fileType:{
        type:String,
    }
    ,
    originalName:{
        type:String,
    }
})
schema.set('toJson' , {vituals:true});
module.exports = mongoose.model('job' , schema);
