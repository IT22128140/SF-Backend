import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

// Route to save profile information
router.post('/profile/save', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, phoneNumber, employeeType, password } = req.body;
    const userId = req.userId; // Assuming you have a middleware to extract the user ID from the request

    // Find the user by their ID
    const user = await RegisEmp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile information
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.emailAddress = emailAddress || user.emailAddress;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.employeeType = employeeType || user.employeeType;
    user.password = password || user.password;

    const savedProfile = await user.save();

    res.status(200).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle any errors
  }
});

// Route to delete the profile
router.delete('/profile/delete', async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have a middleware to extract the user ID from the request

    // Find the user by their ID
    const user = await RegisEmp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's profile
    await user.deleteOne();

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle any errors
  }
});

export default router;