const express = require("express");
const { CreateProfile, UserLogin, SelectProfile, UpdateProfile } = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const { CreateTodo, SelectTodo, UpdateTodo, UpdateTodoStatus, DeleteTodo, SelectTodoByStatus, SelectTodoByDate } = require("../controllers/ToDoListController");
const router = express.Router();


// Create a new profile
router.post("/CreateProfile", CreateProfile);
router.post("/UserLogin", UserLogin);

// Select and update profile
router.get("/SelectProfile",AuthVerifyMiddleware, SelectProfile);
router.post("/UpdateProfile",AuthVerifyMiddleware, UpdateProfile);

// To-Do List routes
router.post("/CreateTodo", AuthVerifyMiddleware, CreateTodo);
router.get("/SelectTodo", AuthVerifyMiddleware, SelectTodo);
router.post("/UpdateTodo", AuthVerifyMiddleware, UpdateTodo);
router.post("/UpdateTodoStatus", AuthVerifyMiddleware, UpdateTodoStatus);
router.post("/DeleteTodo", AuthVerifyMiddleware, DeleteTodo);
router.post("/SelectTodoByStatus", AuthVerifyMiddleware, SelectTodoByStatus);
router.post("/SelectTodoByDate", AuthVerifyMiddleware, SelectTodoByDate);



module.exports = router;