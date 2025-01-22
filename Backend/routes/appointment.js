const express = require('express')
const router = express.Router();
const Appointment = require('../models/appointments');
const fetchuser = require('../middleware/fetchuser');


//Route 1:- Fetch All Appointments using:- GET "api/appointment/appo".
router.get('/appo',async(req,res)=>{
    try {
        const appoinment = await Appointment.find();
        res.json(appoinment);
    } catch (error) {
        console.error(Error.message);
        res.status(500).send("Some Error occured")
    }
})


//Route 1:- Fetch All Appointments Of Specific User using:- GET "api/appointment/appouser".
router.get('/appouser',fetchuser,async(req,res)=>{
  try {
      const appoinment = await Appointment.find({ user: req.user.id });
      res.json(appoinment);
  } catch (error) {
      console.error(Error.message);
      res.status(500).send("Some Error occured")
  }
})




//Route 3:- Create a Appointment :POST "api/appointment/appo".
router.post('/appo',fetchuser,async(req,res)=>{
    try {
        const {f_name,l_name,email,number,NIC,DOB,gander,ADOB,department,doctor,address,status} = req.body;
        const appoinment =new  Appointment({
          f_name,l_name,email,number,NIC,DOB,gander,ADOB,department,doctor,address,status,user:req.user.id
        })
        await appoinment.save()
        res.status(201).json({ message: "Appointment created successfully", appoinment });
    } catch (error) {
        console.error(Error.message);
    res.status(500).send("Some Error occured")
    }
})


//Route 4:- Update an Appointment Status :PETCH "api/appointment/update/:id".
router.patch("/update-status/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      // Find the appointment and update its status
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
  
      res.status(200).json({ message: "Status updated successfully", updatedAppointment });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Failed to update status" });
    }
  });
module.exports = router