// Basic Imports
require("dotenv").config();
const express = require("express");
const router = require("./src/routes/api");
const app = express();

// Security Middlewares
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// Database Import
const mongoose = require("mongoose");

// Security Middlewares
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());
// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Database Connection
let URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    user: process.env.DB_USER || "",
    pass: process.env.DB_PASS || "",
    autoIndex: true,
  })
  .then(() => console.log(`✅ MongoDB Connected: ${URI}`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/v1", router);

// Undefined Routes Handling
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    status: err.statusCode === 404 ? "fail" : "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
