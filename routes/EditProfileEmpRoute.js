import express from 'express';
import RegisEmp from '../models/RegisCusModel.js';


const router = express.Router();


// Route to save profile information
router.post('/profile/save', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password } = req.body;

    // Save the profile information to the database using the RegisCus model
    const newProfile = new RegisEmp({
      FirstName,
      LastName,
      emailAddress,
      phoneNumber,
      employeeType,
      password
    });

    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle any errors
  }
});

// Route to delete the profile
router.delete('/profile/delete', async (req, res) => {
  try {
    // Need to add code to delete the profile information from the database using the RegisEmp model
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle any errors
  }
});

export default router;