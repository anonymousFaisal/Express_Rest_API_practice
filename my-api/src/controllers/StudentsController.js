const StudentsModel = require("../models/StudentsModel");

exports.InsertStudent = (req, res) => {
  let reqBody = req.body;
  StudentsModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(201).json({ status: "Success", data: data });
    }
  });
};
