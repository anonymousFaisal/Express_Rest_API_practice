const StudentsModel = require("../models/StudentsModel");

// CRUD Operations for Students

// C = Create
exports.InsertStudent = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await StudentsModel.create(reqBody);
    res.status(201).json({ status: "Success", data: data });
  } catch (err) {
    res.status(400).json({ status: "Fail", data: err.message });
  }
};

// R = Read
exports.ReadStudent = async (req, res) => {
  try {
    let Query = {};
    let Projection = "Name Roll Class Remarks";

    let data = await StudentsModel.find(Query).select(Projection);

    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


// U = Update
exports.UpdateStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let QUERY = { _id: id };
    let reqBody = req.body;

    let result = await StudentsModel.updateOne(QUERY, reqBody);

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};

// D = Delete
exports.DeleteStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let QUERY = { _id: id };

    let result = await StudentsModel.deleteOne(QUERY);

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


