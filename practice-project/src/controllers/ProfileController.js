const ProfileModel = require("../models/ProfileModel");
var jwt = require("jsonwebtoken");


// Create a new profile
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


// User login
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

// Select profile
exports.SelectProfile = async (req, res) => {
    try {
        const UserName = req.headers.username;
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


// Update profile
exports.UpdateProfile = async (req, res) => {
  try {
    const UserName = req.headers.username;
    let reqBody = { ...req.body };

    // Prevent username update
    if (reqBody.UserName) {
      delete reqBody.UserName;
    }

    // Remove empty fields from update
    Object.keys(reqBody).forEach(key => {
      if (reqBody[key] === "" || reqBody[key] === null || reqBody[key] === undefined) {
        delete reqBody[key];
      }
    });

    // Update profile
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { UserName },
      { $set: reqBody },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      error: err.message
    });
  }
};
