const express = require('express');
const router = express.Router();

// Dummy login for testing
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    return res.status(200).json({ token: "mock-jwt-token" });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});

router.post('/register', (req, res) => {
  return res.status(201).json({ message: "User registered successfully!" });
});

router.get('/status', (req, res) => {
  return res.status(200).json({ authenticated: true });
});

module.exports = router;
