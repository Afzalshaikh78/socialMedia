const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // 🔎 Debug logs
  console.log("Auth header:", authHeader);
  console.log("Extracted token:", token);

  if (!token) {
    logger.warn("Access attempt without valid token!");
    return res.status(401).json({
      message: "Authentication required",
      success: false,
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.warn("JWT verification failed", { error: err.message });
      console.log("JWT verification error:", err.message); // 🔎 Debug
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    req.user = user;
    next();
  });
};

module.exports = { validateToken };
