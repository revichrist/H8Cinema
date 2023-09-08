const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// buat tokennya
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

// authentication
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };