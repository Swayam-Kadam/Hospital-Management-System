const express = require('express')
const router = express.Router();
const multer = require('multer');
const Doctor = require('../models/doctors');
const {body,validationResult} = require('express-validator');

//configure Multer for file strorage
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter:(req,file,cb) =>{
        const allowedTypes =['image/jpeg','image/png','image/svg'];
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Error('only JPEG,PNG and SVG files are allowed'),false);
        }
        cb(null,true)
    }
});

//Route 1:- Fetch All Doctor Details Using: GET "/api/doctor".

router.get('/',async(req,res)=>{
    try{
        const doctor = await Doctor.find();
        res.json(doctor);
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})

//Router 2 :- create a doctor using : POST "/api/doctor".Doesn't require Auth

router.post('/',
    upload.single('img'), // Multer middleware for handling single file upload with key "img"
    [
    body('email').isEmail().withMessage('plz enter valid email'),
    body('number').isLength({min:10,max:10}).withMessage('Phone-number must be 10 Digits'),
    body('NIC').isLength({min:8,max:8}).withMessage('NIC must be 8 Digits')
],async(req,res)=>{
        const result  = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).json({error: result.array() });
        }

        try {
            let doctorEmail = await Doctor.findOne({email:req.body.email})
            if(doctorEmail){
                return res.status(400).json({error:"sorry a doctor with email already exist"})
            }

            //Create and save the doctor
            const doctorData={
                ...req.body,
                img: req.file ? req.file.path : req.body.img // Save file path with key "img"
            };
            const doctor = new Doctor(doctorData)
            await doctor.save()
            res.status(201).json({ message: "Doctor created successfully", doctor });
        } catch (error) {
            console.error(Error.message);
    res.status(500).send("Some Error occured")
        }
})

module.exports = router