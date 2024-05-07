import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password } = req.body;


    // Create a new user using the RegisCus model
    const newUser = new RegisCus({
      FirstName,
      LastName,
      emailAddress,
      phoneNumber,
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