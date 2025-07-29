const express = require("express");
const { HelloPost, HelloGet } = require("../controllers/HelloController");
const { ReadStudent, InsertStudent, UpdateStudent, DeleteStudent } = require("../controllers/StudentsController");
const router = express.Router();

// This is my first get routing
router.get("/hello-get", HelloGet);

// This is my first post routing
router.post("/hello-post", HelloPost);

// Moongoose
// CRUD Operations for Students
router.post("/InsertStudent", InsertStudent);
router.get("/ReadStudent", ReadStudent);
router.post("/UpdateStudent/:id", UpdateStudent);
router.get("/DeleteStudent/:id", DeleteStudent);


module.exports = router;
