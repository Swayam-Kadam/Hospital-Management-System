const mongoose = require('mongoose')
const {Schema} = mongoose

const AppointmentSchema = Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
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
    ADOB:{
        type:Date,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    doctor:{
        type:String,
        require:true
    },
    address:{
        type:String
    },
    status:{
        type:String,
        default:'pending'
    }
    
})

const Appointment = mongoose.model('appointments',AppointmentSchema)
Appointment.createIndexes()
module.exports = Appointment