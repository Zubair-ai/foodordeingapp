const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

// config
dotenv.config();

router.get('/displaydatacate', async (req, res) => {
  try {
    const uri = process.env.MONGOURI;
    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db('foodhub').collection('sample2');
    const data = await collection.find({}).toArray();
    res.status(200).send({
        success:true,
        message:"food items are get successfully",
        data
    })
    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
