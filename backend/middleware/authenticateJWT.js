const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "your_default_secret_key";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(403).send("Forbidden: Invalid token");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Unauthorized: No token provided");
  }
};

module.exports = authenticateJWT;
