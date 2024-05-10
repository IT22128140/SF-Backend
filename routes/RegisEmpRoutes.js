import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password, employeeType} = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the RegisEmp model
    const newUser = new RegisEmp({
      FirstName,
      LastName,
      emailAddress,
      phoneNumber,
      employeeType,
      password: hashedPassword
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