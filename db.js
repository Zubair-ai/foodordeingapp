const mongoose = require("mongoose");
const dotenv = require("dotenv");

// config
dotenv.config();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
}

module.exports = connectToDatabase;
