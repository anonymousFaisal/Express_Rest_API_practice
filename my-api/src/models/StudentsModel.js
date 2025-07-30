const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    Name: String,
    Roll: {
      type: Number,
      min: [1, "Roll number must be greater than 0 and less than 1000, currently set to {VALUE}"],
      max: [1000, "Roll number must be greater than 0 and less than 1000, currently set to {VALUE}"],
    },
    Class: String,
    Mobile: {
      type: String,
      Validite: {
        validator: function (value) {
          if (value.length === 11) {
            return true;
          } else {
            return false;
          }
        },
        message: "Mobile number must be 11 digits",
      },
      Remarks: { type: String, default: "No remarks" },
    },
  },
  { versionKey: false }
);

const StudentsModel = mongoose.model("students", DataSchema);
module.exports = StudentsModel;
