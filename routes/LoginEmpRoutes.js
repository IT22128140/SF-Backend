const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST - Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update user details (if needed)
router.put('/:id', async (req, res) => {
  try {
    // Update user details
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete user account (if needed)
router.delete('/:id', async (req, res) => {
  try {
    // Delete user account
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
