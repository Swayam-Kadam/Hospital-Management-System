const mongoose = require('mongoose');
const {Schema} = mongoose

const MessegeSchema = Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        require:true
    }
});

const Message = mongoose.model('message',MessegeSchema)
Message.createIndexes()
module.exports = Message