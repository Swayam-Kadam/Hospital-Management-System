const express = require('express');
const User = require('../models/users');
const router = express.Router();
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = 'swayamisagoodb$oy';

//ROUT 1:- Create user using: POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name').isLength({min:3}).withMessage('name length should be minimum 3'),
    body('email').isEmail(),
    body('password').isLength({min:5}).withMessage('password length should be minimum 5')
],async(req,res)=>{
    let success = false;
     //if there are errors,return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,error:errors.array()});
    }

    try{
        //check whater the user with this email exist already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success,error:"sorry a user with this email already exist"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Create a new user
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
            address:req.body.address,
            DOB:req.body.dob,
            gender:req.body.gender,
        });

        const data ={        //here data is a object is store user object and user id for jwt token.
            user:{
               id:user.id     //we use id as jwt token because id is unique index
            }
         }
         const authtoken = jwt.sign(data,JWT_SECRET);  //first is data id its convert to jwt token and second is a secrate token it is know only admin to authenticate user are verify or not

         success=true;
         res.json({success,authtoken})  //when data is insert successfully then return JWT TOKEN as a response and it is compalsory to write .

    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2:-Authenticate a user using : POST  "/api/auth/login". No login required
router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('password can not be blanck')
],async(req,res)=>{
    let success = false;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    const {email,password} =req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"plz try to login with correct creadentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success,error:"plz try to login with correct credentials"})
        }

        const data = {
            user:{
               id:user.id
            }
         }
         const authtoken = jwt.sign(data,JWT_SECRET);
         success = true;
         res.json({success,authtoken,role:user.role})
    } catch (error) {
        console.log(error.message);
         res.status(500).send("Internal Server Error");
    }
})


// ROUTE 3: find a specific user data  using : GET  "/api/auth/fetch".login required
router.get('/fetch',fetchuser,async(req,res)=>{
    try {
        const response = await User.findById(req.user.id).select("-password");
    res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, address, DOB, gender } = req.body;
    
    try {
        const response = await User.findByIdAndUpdate(
            id,
            { name, address, DOB, gender },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ error: "User Not Found" });
        }

        res.status(200).json({ message: "User updated successfully", response });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
});



module.exports = router