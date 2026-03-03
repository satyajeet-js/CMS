const express = require("express");
const router = express.Router();
const { updateStudentProfile } = require("../controllers/studentController");
// CHANGE THIS: Match the name used in your middleware file
const { verifyToken } = require("../middleware/authMiddleware"); 

// Matches: PUT /api/students/update
router.put("/update", verifyToken, updateStudentProfile);

module.exports = router;