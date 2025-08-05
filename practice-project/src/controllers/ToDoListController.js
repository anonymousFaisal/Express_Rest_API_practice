const ToDoListModel = require("../models/ToDOListModel");

// Create a new To-Do item
exports.CreateTodo = async (req, res) => {
  try {
    const { TodoSubject, TodoDescription } = req.body;
    const UserName = req.headers.username; // From JWT auth middleware

    // Validation
    if (!TodoSubject || !TodoDescription) {
      return res.status(400).json({
        message: "TodoSubject and TodoDescription are required"
      });
    }

    const now = new Date();
    // Create new todo
    const todo = await ToDoListModel.create({
      UserName,
      TodoSubject,
      TodoDescription,
      TodoStatus: "New", // Default
      TodoCreateDate: now,
      TodoUpdateDate: now
    });

    res.status(201).json({
      message: "To-Do item created successfully",
      data: todo
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating To-Do item",
      error: err.message
    });
  }
};

// Select To-Do items for a user
exports.SelectTodo = async (req, res) => {
    try {
        const UserName = req.headers.username;
        const user = await ToDoListModel.find({ UserName });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "To-Do items retrieved successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving To-Do items",
            error: err.message,
        });
    }
}
