const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/hospital"

const connectToMongo = () =>{
    mongoose.connect(mongoURI,{});
    console.log("Connection Successful");
};

module.exports = connectToMongo