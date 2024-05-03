import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

router.post('/RegisEmp', async (req, res) => {
  try {
    const { email, password, loginType } = req.body;

    // Need to add login logic here:
    const employee = await RegisEmp.findOne({ email });

    if (!employee || employee.password !== password || employee.loginType !== loginType) {
      return res.status(401).json({ message: 'Invalid email, password, or login type. Please try again.' });
    }

    // Here we can compare the hashed password using a library like bcrypt
    if (password !== employee.password) {
      return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
    }

    // Generate token for authentication
    const token = generateToken();

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to generate token
function generateToken() {
  // Need to Implement token generation logic here
}

export default router;