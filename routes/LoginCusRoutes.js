import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/RegisCus', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user exists
    const user = await RegisCus.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Generate token for authentication 
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;