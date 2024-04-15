import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password, password2, employeeType } = req.body; // Added employeeType destructuring

    // Check if passwords match
    if (password !== password2) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Create a new user using the RegisEmp model
    const newUser = new RegisEmp({
      FirstName,
      LastName,
      emailAddress,
      phoneNumber,
      employeeType,
      password
    });
    
    // Save the user to the database
    const savedUser = await newUser.save();
    
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error registering user' });
  }
});

export default router;