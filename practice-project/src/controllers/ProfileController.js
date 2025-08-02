const ProfileModel = require("../models/ProfileModel");

exports.CreateProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await ProfileModel.create(reqBody);
    res.status(201).json({
      message: "Profile created successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error creating profile",
      error: err.message,
    });
  }
};
