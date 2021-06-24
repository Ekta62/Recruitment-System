const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema( {
    fullName: {
    type: String,
    required:true
},
firstName:{
    type:String
},
email: {
    type: String,
    unique:true,
    required:true
},

hash: {
    type: String,
    required:true
},
role: {
    type: String,
    
},
active:{
    type:Boolean,
},
createdDate : {
    type:Date,
    default:Date.now
}
});

schema.set('toJson' , {vituals:true});
module.exports = mongoose.model('User' , schema);