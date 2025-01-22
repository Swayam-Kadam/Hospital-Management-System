const mongoose = require("mongoose");
const {Schema} = mongoose;

const DoctorSchema = new Schema({
    img:{
        type:String,
        require:true
    },
    f_name:{
        type:String,
        require:true
    },
    l_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    NIC:{
        type:Number,
        require:true
    },
    DOB:{
        type:Date,
        require:true
    },
    gander:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    }
});

const Doctor = mongoose.model('doctors',DoctorSchema);
Doctor.createIndexes()
module.exports = Doctor