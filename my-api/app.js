const express = require('express');
const router= require("./src/routes/api");

const app = new express();


app.use("/api/v1", router);

app.all("*",(req,res)=>{
    res.status(404).json({
        status: "404",
        message: "Not Found"
    })
})





module.exports = app;