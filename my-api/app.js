const express = require('express');
const router= require("./src/routes/api");
const app = new express();

// Security Middleware Import
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')
const mongoose = require('mongoose');


// Security middleware implement
app.use(cors)
app.use(helmet)
app.use(mongoSanitize)
app.use(hpp)


// Request Rate Limiter
/*const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100
});
app.use(limiter);
 */


// MongoDB Connection
let URI = "mongodb://localhost:27017/Schools";

mongoose.connect(URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

app.use("/api/v1", router);

app.all("*",(req,res)=>{
    res.status(404).json({
        status: "404",
        message: "Not Found"
    })
})





module.exports = app;