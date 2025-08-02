const express = require("express");
const { CreateProfile, UserLogin, SelectProfile } = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();


// Create a new profile
router.post("/CreateProfile", CreateProfile);
router.post("/UserLogin", UserLogin);
router.get("/SelectProfile",AuthVerifyMiddleware, SelectProfile);

module.exports = router;