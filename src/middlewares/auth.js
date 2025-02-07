const jwt = require("jsonwebtoken");
const config = require("../config/dotenv");

const jwt_secret = config.jwt_secret || "your_secret_key";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
