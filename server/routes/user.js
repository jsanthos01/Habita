const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth")

const { 
    userInfo,
    createHabit
} = require('../controllers/user');


router.route("/").get(protect, userInfo);
router.route("/habit/create").post(protect, createHabit);

module.exports = router;