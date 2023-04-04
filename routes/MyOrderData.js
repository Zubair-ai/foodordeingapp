const express =require('express');
const router= express.Router();
const Order= require('../models/Orders')

router.post('/myorderdata', async(req,res)=>{
    try {
       let myOrderData=await Order.findOne({email:req.body.email});
       res.status(200).send({
        success: true,
        message:"got orderdata successfully",
        myOrderData
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'server error' });
    }
})

module.exports=router;