const express = require('express');
const {HelloPost, HelloGet} = require("../controllers/HelloController");
const router = express.Router();


// This is my first get routing
router.get('/hello-get', HelloGet);

// This is my first post routing
router.post('/hello-post', HelloPost);


module.exports = router;


