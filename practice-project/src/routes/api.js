const express = require("express");
const { CreateProfile } = require("../controllers/ProfileController");
const router = express.Router();


// Create a new profile
router.post("/CreateProfile", CreateProfile);

module.exports = router;