const express = require("express");
const router = require("./src/routes/api");
const app = express();

// Security Middleware Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const mongoose = require("mongoose");

// Security Middleware Implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json());

// Request Rate Limiter
/*
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
*/

// MongoDB Connection
// MongoDB Connection
const URI = "mongodb://127.0.0.1:27017/Schools";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes
app.use("/api/v1", router);

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).json({
    status: "404",
    message: "Not Found",
  });
});

module.exports = app;
