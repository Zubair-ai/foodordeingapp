const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require("../models/Users");

const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const jwtSecret='mynameiszubairiqbalandiamwebdeveloper'
router.post(
  "/loginusers",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    try {
      let userdata = await Users.findOne({email:email});
      if (!userdata) {
        return res.status(400).json({ error: "Please SignUp" });
      }
      const comparePassword=await bcrypt.compare(req.body.password,userdata.password)
      if (!comparePassword) {
        return res.status(400).json({ error: "Please enter correct Password" });
      }

      const data={
        user:{
            id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.status(200).json({ message: "successfully loggedin",authToken:authToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
  }
);

module.exports=router;