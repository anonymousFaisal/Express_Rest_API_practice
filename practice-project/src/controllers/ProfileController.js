const ProfileModel = require("../models/ProfileModel");
var jwt = require("jsonwebtoken");

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

exports.UserLogin = async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    // Find user
    const user = await ProfileModel.findOne({ UserName, Password });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    // Success
    let PayLoad = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      data: user,
    };
    let token = jwt.sign(PayLoad, "secretkey123");
    res.status(200).json({
      message: "Login successful",
      token: token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during login",
      error: err.message,
    });
  }
};


exports.SelectProfile = async (req, res) => {
    try {
        const { UserName } = req.body;
        const user = await ProfileModel.findOne({ UserName });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "Profile retrieved successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving profile",
            error: err.message,
        });
    }
}