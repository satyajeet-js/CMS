const db = require("../config/db");

const updateStudentProfile = (req, res) => {
  const { roll_no, phone, year, department } = req.body;
  const studentId = req.user.id; 

  const updateSql = `
    UPDATE students 
    SET roll_no = ?, phone = ?, year = ?, department = ? 
    WHERE id = ?
  `;

  // 1. Run the Update Query
  db.query(updateSql, [roll_no, phone, year, department, studentId], (err, result) => {
    if (err) {
      console.error("❌ Update Error:", err);
      return res.status(500).json({ error: "Database error during update" });
    }

    // 2. Fetch the updated data to send back to the Dashboard
    const fetchSql = "SELECT id, name, email, roll_no, phone, year, department FROM students WHERE id = ?";
    
    db.query(fetchSql, [studentId], (err, rows) => {
      if (err) {
        console.error("❌ Fetch Error:", err);
        return res.status(500).json({ error: "Profile updated, but failed to fetch fresh data" });
      }

      // Return the first row (the user object)
      res.status(200).json(rows[0]);
    });
  });
};

module.exports = { updateStudentProfile };