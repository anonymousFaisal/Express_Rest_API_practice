const express = require("express");
const { HelloPost, HelloGet } = require("../controllers/HelloController");
const { ReadStudent, InsertStudent, UpdateStudent, DeleteStudent } = require("../controllers/StudentsController");
const { CreateToken, DecodeToken } = require("../controllers/JWTPractice");
const TokenVerifyMiddleware = require("../middleware/TokenVerifyMiddleware");
const { TokenIssue } = require("../controllers/TokenIssueController");
const router = express.Router();

// This is my first get routing
router.get("/hello-get", HelloGet);

// This is my first post routing
router.post("/hello-post", HelloPost);

// Moongoose
// CRUD Operations for Students
// JWT Authentication Practice
router.get("/TokenIssue", TokenIssue)
router.post("/InsertStudent", TokenVerifyMiddleware, InsertStudent);
router.get("/ReadStudent",TokenVerifyMiddleware, ReadStudent);
router.post("/UpdateStudent/:id",TokenVerifyMiddleware, UpdateStudent);
router.get("/DeleteStudent/:id",TokenVerifyMiddleware, DeleteStudent);

// Practice JWT Encoding and Decoding
// Create JWT Token
router.get("/CreateToken", CreateToken);
// Decode JWT Token
router.get("/DecodeToken", DecodeToken);

module.exports = router;
