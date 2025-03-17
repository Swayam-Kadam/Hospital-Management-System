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

//Route 3:-Fetch specific user message:Get "api/message/specific-user".
router.get('/specific-user',fetchuser,async(req,res)=>{
    try {
        const response = await Message.find({user:req.user.id});
        res.json(response);
    } catch (error) {
        console.error(Error.message);
        res.status(500).send("some Error occured")
    }
})

//Route 4:-Update a message for adding a replay for a message
router.patch('/message-update/:id',async(req,res)=>{
    const {id} = req.params;
    const {replay} = req.body;
    try {
        const response = await Message.findByIdAndUpdate(
            id,
            {replay},
            {new:true}
        );
        if (!response) {
            return res.status(404).json({ error: "User Not Found" });
        }

        res.status(200).json({ message: "User updated successfully", response });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
})

module.exports = router;