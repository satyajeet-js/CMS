const express = require("express");
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// ---------------------------------------------------------
// STUDENT ROUTES
// ---------------------------------------------------------

// 1. POST a new complaint
router.post("/", verifyToken, (req, res) => {
  const { title, category, description } = req.body;
  const studentId = req.user.id; // From verifyToken middleware

  const sql = "INSERT INTO complaints (student_id, title, category, description, status) VALUES (?, ?, ?, ?, 'Pending')";

  db.query(sql, [studentId, title, category, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ id: result.insertId, message: "Complaint submitted!" });
  });
});

// 2. GET complaints for the logged-in student
router.get("/student", verifyToken, (req, res) => {
  const studentId = req.user.id;
  const sql = "SELECT * FROM complaints WHERE student_id = ? ORDER BY created_at DESC";

  db.query(sql, [studentId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ---------------------------------------------------------
// PRINCIPAL ROUTES
// ---------------------------------------------------------

// 3. GET all complaints (With Student Names & Roll No for Principal Dashboard)
router.get("/", verifyToken, (req, res) => {
  const sql = `
    SELECT 
  c.*,
  s.name AS student_name,
  s.roll_no,
  s.department AS student_department,
  s.year
FROM complaints c
JOIN students s ON c.student_id = s.id
ORDER BY c.created_at DESC;

  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// 4. UPDATE status (Pending -> In Progress -> Resolved)
router.put("/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE complaints SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Status updated successfully" });
  });
});

// 5. REPLY to a complaint
router.put("/:id/reply", verifyToken, (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  // We update the reply and automatically set status to 'Resolved'
  const sql = "UPDATE complaints SET principal_reply = ?, status = 'Resolved' WHERE id = ?";

  db.query(sql, [reply, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Reply added and complaint resolved" });
  });
});

module.exports = router;