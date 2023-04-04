const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/deletehistory", async (req, res) => {
  
    try {
        await Order.findOneAndDelete({email:req.body.email});
        res.status(200).send({
            success: true,
            message:"order history deleted successfully",
           })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"sever error"
        })
    }
});

module.exports = router;
