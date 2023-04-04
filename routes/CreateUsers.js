const express= require('express');
const router=express.Router();
const User=require('../models/Users')
const { body, validationResult } = require('express-validator');


const bcrypt= require("bcrypt");



router.post('/createuser',
 [body('email').isEmail(),
 body('password').isLength({ min: 5 })],
async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    const salt=await bcrypt.genSalt(10);
    let securePassword=await  bcrypt.hash(req.body.password,salt)

    try {
       await User.create(
           {
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location,
           }
        )
        res.json({sucess:true})
    } catch (error) {
        console.log(error)
        res.json({sucess:false})
    }
})

module.exports=router;