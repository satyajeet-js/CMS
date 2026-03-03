const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= STUDENT REGISTER ================= */
const register = (req, res) => {
  const { name, email, password, phone, roll_no, department, year } = req.body;

  // 🔹 Full validation
  if (!name || !email || !password || !phone || !roll_no || !department || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 🔹 Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // 🔹 SQL Query
  const sql = `
    INSERT INTO students 
    (name, email, password, phone, roll_no, department, year)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, hashedPassword, phone, roll_no, department, year],
    (err, result) => {
      if (err) {
        // Handle duplicate email or roll number
        if (err.code === "ER_DUP_ENTRY") {
          if (err.sqlMessage.includes("email")) {
            return res.status(409).json({ message: "Email already exists" });
          }
          if (err.sqlMessage.includes("roll_no")) {
            return res.status(409).json({ message: "Roll number already exists" });
          }
        }
        return res.status(500).json({ message: "Database error", error: err });
      }

      return res.status(201).json({
        message: "Student registered successfully"
      });
    }
  );
};

/* ================= STUDENT LOGIN ================= */
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = "SELECT * FROM students WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

 const token = jwt.sign(
  { id: user.id, role: "student" },
  process.env.JWT_SECRET || "MY_TEMP_SECRET_KEY_123", // Fallback added
  { expiresIn: "1d" }
);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: "student",
      token
    });
  });
};

/* ================= PRINCIPAL LOGIN (HARDCODED) ================= */
const principalLogin = (req, res) => {
  const { email, password } = req.body;

  const PRINCIPAL_EMAIL = "satyajeet2004patil@gmail.com";
  const PRINCIPAL_PASSWORD = "patil01";

  if (email !== PRINCIPAL_EMAIL || password !== PRINCIPAL_PASSWORD) {
    return res.status(401).json({ message: "Invalid principal credentials" });
  }

  const token = jwt.sign(
    { role: "principal" },
    "SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    name: "Principal",
    email: PRINCIPAL_EMAIL,
    role: "principal",
    token
  });
};

/* ================= EXPORTS ================= */
module.exports = {
  register,
  login,
  principalLogin
};
