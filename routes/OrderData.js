const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderdata", async (req, res) => {
  const data = [req.body.orderData];
  console.log("data in ", data);
  await data.push({orderDate:req.body.orderDate})
   console.log("this is date",data.push({orderDate:req.body.orderDate}))
  const eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        orderData: { data },
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { orderData: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

module.exports = router;
