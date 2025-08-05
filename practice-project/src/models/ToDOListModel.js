const mongoose = require("mongoose");

const ToDoListSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    TodoSubject: {
      type: String,
      required: true,
      trim: true,
    },
    TodoDescription: {
      type: String,
      required: true,
      trim: true,
    },
    TodoStatus: {
      type: String,
      enum: ["New", "In Progress", "Completed"], // Restricts values
    },
    TodoCreateDate: {
      type: Date,
    },
    TodoUpdateDate: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

const ToDoListModel = mongoose.model("lists", ToDoListSchema);

module.exports = ToDoListModel;
