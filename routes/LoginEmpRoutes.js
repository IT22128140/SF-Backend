import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password, loginType } = req.body;

    // Validate input data
    if (!email || !password || !loginType) {
      return res.status(400).json({ message: 'Email, password, and login type are required.' });
    }

    // Check if user exists
    const employee = await RegisEmp.findOne({ email });

    if (!employee || employee.password !== password || employee.loginType !== loginType) {
      return res.status(401).json({ message: 'Invalid email, password, or login type. Please try again.' });
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Generate token for authentication 
    const token = jwt.sign({ email: employee.email }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;