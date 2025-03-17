const express = require('express')
const router = express.Router();
const Appointment = require('../models/appointments');
const fetchuser = require('../middleware/fetchuser');
const stripe = require("stripe")("sk_test_51QzWpjFLeQgcJ2mRyWSXcE0vDm7j8WcHyXRvrwMHVjY6DB6BCLWvvwdsOcFvRM3GE8rTD2L1pTRtMhY4huC1sG1s00AdNM1tnq"); // Replace with your secret key


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

  // router.post("/create-checkout-session",async(req,res)=>{
  //   const {appoinment} = req.body;

  //   const lineItems = appoinment.map((appo)=>({
  //     price_data:{
  //       currency:"ruppey",
  //       appointment_data:{
  //         name:appo.f_name + " " + appo.l_name,
  //         email:appo.email
  //       },
  //       unit_amount:"500"
  //     },
  //   }));
  //   const session = await stripe.checkout.session.create({
  //     payment_method_types:["card"],
  //     line_items:lineItems,
  //     mode:"payment",
  //     success_url:"http://localhost:3000/Appointment",
  //     cancel_url:"http://localhost:3000/"
  //   })
  //   res.json({id:session.id})
  // })


router.post("/create-checkout-session", async (req, res) => {
    try {
        const { appointment } = req.body;

        const lineItems = appointment.map((appo) => ({
            price_data: {
                currency: "inr", // Correct currency code for Indian Rupees
                product_data: {  // Use product_data instead of appointment_data
                    name: `${appo.f_name} ${appo.l_name}`,
                    description: `Appointment for ${appo.email}`, // Additional info
                },
                unit_amount: 50000, // Correct format (50000 = ₹500.00)
            },
            quantity: 1, // Required field
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/unsuccess",
            metadata: {
                user_email: appointment[0].email, // Store extra info in metadata
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router

