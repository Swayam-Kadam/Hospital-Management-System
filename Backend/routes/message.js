const express = require('express');
const router = express.Router(); 
const Message = require('../models/messages');
const fetchuser = require('../middleware/fetchuser')

//Route 1:- Create a Message :POST "api/message/send".
router.post('/send',fetchuser,async(req,res)=>{
    try {
        const {title,message,tag} = req.body;
        const messages = new Message({
            title,message,tag,user:req.user.id
        })
        await messages.save()
        res.status(201).json({ message: "message created successfully", messages });
    } catch (error) {
        console.error(Error.message);
    res.status(500).send("Some Error occured")
    }
})

//Route 2:-Get All Message :POST "api/message/fetch".
router.get('/fetch',async(req,res)=>{
    try {
        const messages = await Message.find();
        res.json(messages); 
    } catch (error) {
        console.error(Error.message);
        res.status(500).send("some Error occured")
    }
})


module.exports = router;