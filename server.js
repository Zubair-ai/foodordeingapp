const morgan = require('morgan')
const cors = require('cors')
const express = require('express')
const path = require("path");

const connectToDatabase= require('./db');
connectToDatabase();

const app = express();

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//        "Access-Control-Allow-Headers" ,
//        "Origin,X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

// midlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/build')));


app.use(express.json())
app.use('/api',require("./routes/CreateUsers"))
app.use('/api',require("./routes/LoginUsers"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/DisplayCategory"))
app.use('/api',require("./routes/OrderData"))
app.use('/api',require("./routes/MyOrderData"))
app.use('/api',require("./routes/HistoryDelete"))




app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
});

const PORT=process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})