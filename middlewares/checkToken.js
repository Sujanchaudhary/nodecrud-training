const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "your_secret_key";

// Middleware to check token and role
function checkTokenAndRole(role) {
  return function (req, res, next) {
    // Get the token from the request header
    const token = req.headers["authorization"];

    // Check if token is present
    if (!token) {
      return res.status(401).json({ error: "No token provided." });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Failed to authenticate token." });
      }

      // Check if user has the required role
      if (!decoded || !decoded.role || decoded.role !== role) {
        return res
          .status(403)
          .json({
            error: "You do not have permission to access this resource.",
          });
      }

      // If token is valid and user has the required role, save decoded token to request for later use
      req.decoded = decoded;
      next();
    });
  };
}
module.exports = { checkTokenAndRole };
