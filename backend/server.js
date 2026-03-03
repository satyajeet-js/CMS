
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");


const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.use("/api/students", studentRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
