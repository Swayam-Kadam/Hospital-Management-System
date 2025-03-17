const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    address:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const user = mongoose.model('user',userSchema);
module.exports = user