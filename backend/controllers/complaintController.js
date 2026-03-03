const db = require("../config/db");

/* STUDENT CREATE */
exports.createComplaint = (req, res) => {
  const { title, category, description } = req.body;
  const studentId = req.user.id;

  if (!title || !category || !description) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql = `
    INSERT INTO complaints (student_id, title, category, description, status)
    VALUES (?, ?, ?, ?, 'Pending')
  `;

  db.query(sql, [studentId, title, category, description], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.status(201).json({
      id: result.insertId,
      title,
      category,
      description,
      status: "Pending",
    });
  });
};

/* STUDENT VIEW */
exports.getStudentComplaints = (req, res) => {
  const sql = `
    SELECT id, title, category, description, status, principal_reply, created_at
    FROM complaints
    WHERE student_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(results);
  });
};

/* PRINCIPAL VIEW */
/* PRINCIPAL VIEW ALL COMPLAINTS */
exports.getAllComplaints = (req, res) => {
  // We JOIN students table to get the name based on student_id
  const sql = `
    SELECT c.*, s.name AS student_name, s.email 
    FROM complaints c
    JOIN students s ON c.student_id = s.id
    ORDER BY c.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database Error" });
    }
    res.json(results);
  });
};

/* REPLY TO COMPLAINT */
exports.replyComplaint = (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  // We update the reply AND usually set status to Resolved automatically
  const sql = "UPDATE complaints SET principal_reply = ?, status = 'Resolved' WHERE id = ?";

  db.query(sql, [reply, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding reply" });
    res.json({ message: "Reply sent successfully" });
  });
};

/* UPDATE STATUS */
exports.updateStatus = (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE complaints SET status=? WHERE id=?",
    [status, req.params.id],
    () => res.json({ message: "Status updated" })
  );
};

/* REPLY */
exports.replyComplaint = (req, res) => {
  const { reply } = req.body;

  db.query(
    `UPDATE complaints SET principal_reply=?, status='Resolved' WHERE id=?`,
    [reply, req.params.id],
    () => res.json({ message: "Reply sent" })
  );
};
