const connectToMongo = require('./db')
const express = require('express')
const path = require('path');
const cors = require('cors');

connectToMongo();
const app = express()
const port =3001

app.use(express.json())  //it is a middleware, require to deal with mongodb beacause it Handling incoming data in JSON format from API clients.

app.use(cors());

app.use('/api/doctor',require('./routes/doctor'))
app.use('/api/appointment',require('./routes/appointment'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/message',require('./routes/message'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})