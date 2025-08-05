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
        const todos = await ToDoListModel.find({ UserName });
        if (!todos) {
            return res.status(404).json({
                message: "No To-Do items found for this user",
            });
        }
        res.status(200).json({
            message: "To-Do items retrieved successfully",
            data: todos,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving To-Do items",
            error: err.message,
        });
    }
}

// Update a To-Do item
exports.UpdateTodo = async (req, res) => {
  try {
    const UserName = req.headers.username; // From JWT middleware
    const { _id, TodoSubject, TodoDescription } = req.body;

    // Validate input
    if (!_id || !TodoSubject || !TodoDescription) {
      return res.status(400).json({
        message: "Missing required fields: _id, TodoSubject, and TodoDescription"
      });
    }

    // Update only the allowed fields
    const updatedTodo = await ToDoListModel.findOneAndUpdate(
      { _id, UserName },
      {
        $set: {
          TodoSubject,
          TodoDescription,
          TodoUpdateDate: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "To-Do item not found or you do not have permission to update it"
      });
    }

    res.status(200).json({
      message: "To-Do item updated successfully",
      data: updatedTodo
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating To-Do item",
      error: err.message
    });
  }
};

// Update Status of a To-Do item
exports.UpdateTodoStatus = async (req, res) => {
  try {
    const UserName = req.headers.username; // From JWT middleware
    const { _id, TodoStatus } = req.body;

    // Validate input
    if (!_id || !TodoStatus) {
      return res.status(400).json({
        message: "Missing required fields: _id and TodoStatus"
      });
    }

    // Validate status against allowed values
    const allowedStatuses = ["New", "Completed", "Cancel"];
    if (!allowedStatuses.includes(TodoStatus)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`
      });
    }

    // Update only TodoStatus and UpdateDate
    const updatedStatusTodo = await ToDoListModel.findOneAndUpdate(
      { _id, UserName },
      {
        $set: {
          TodoStatus,
          TodoUpdateDate: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedStatusTodo) {
      return res.status(404).json({
        message: "To-Do item not found or you do not have permission to update it"
      });
    }

    res.status(200).json({
      message: "To-Do item status updated successfully",
      data: updatedStatusTodo
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating To-Do item status",
      error: err.message
    });
  }
};


// Delete a To-Do item
exports.DeleteTodo = async (req, res) => {
  try {
    const UserName = req.headers.username; // From JWT middleware
    const { _id } = req.body;

    // Validate input
    if (!_id) {
      return res.status(400).json({
        message: "Missing required field: _id"
      });
    }

    // Find and delete the to-do item
    const deletedTodo = await ToDoListModel.findOneAndDelete({ _id, UserName });

    if (!deletedTodo) {
      return res.status(404).json({
        message: "To-Do item not found or you do not have permission to delete it"
      });
    }

    res.status(200).json({
      message: "To-Do item deleted successfully",
      data: deletedTodo
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting To-Do item",
      error: err.message
    });
  }
};


// Select To-Do items By Status
exports.SelectTodoByStatus = async (req, res) => {
  try {
    const UserName = req.headers.username; // From JWT
    const { TodoStatus } = req.body;

    if (!TodoStatus) {
      return res.status(400).json({
        message: "Missing required field: TodoStatus"
      });
    }

    // Find todos with given status
    const todos = await ToDoListModel.find({ UserName, TodoStatus });

    if (!todos) {
      return res.status(404).json({
        message: `No To-Do items found with status: ${TodoStatus}`
      });
    }

    res.status(200).json({
      message: "To-Do items retrieved successfully",
      data: todos
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving To-Do items",
      error: err.message
    });
  }
};


// Select To-Do items by date range
exports.SelectTodoByDate = async (req, res) => {
  try {
    const UserName = req.headers.username; // From JWT
    const { FromDate, ToDate } = req.body; // Expect YYYY-MM-DD format

    // Validate input
    if (!FromDate || !ToDate) {
      return res.status(400).json({
        message: "Missing required fields: FromDate and ToDate"
      });
    }

    // Convert to date objects with full-day range
    const startDate = new Date(FromDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(ToDate);
    endDate.setHours(23, 59, 59, 999);

    // Find todos within the date range
    const todos = await ToDoListModel.find({
      UserName,
      TodoCreateDate: { $gte: startDate, $lte: endDate }
    });

    if (!todos || todos.length === 0) {
      return res.status(404).json({
        message: `No To-Do items found between ${FromDate} and ${ToDate}`
      });
    }

    res.status(200).json({
      message: "To-Do items retrieved successfully",
      data: todos
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving To-Do items",
      error: err.message
    });
  }
};

