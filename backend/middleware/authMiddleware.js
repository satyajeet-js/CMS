

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  // 1. ✅ CHECK BYPASS FIRST (No JWT check for Principal)
  if (token === "PERMANENT_PRINCIPAL_BYPASS_TOKEN") {
    // !! CHANGE 'id: 1' TO A REAL ID FROM YOUR DATABASE !!
    req.user = { id: 1, role: 'principal', name: 'Satyajeet' }; 
    return next();
  }

  // 2. ✅ JWT VERIFICATION (For Students)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "MY_TEMP_SECRET_KEY_123");
    req.user = decoded;
    next();
  } catch (err) {
    // If the token wasn't the bypass token AND isn't a valid JWT, it reaches here
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

const requirePrincipal = (req, res, next) => {
  if (!req.user || req.user.role !== "principal") {
    return res.status(403).json({ message: "Principal access only" });
  }
  next();
};

module.exports = { verifyToken, requirePrincipal };