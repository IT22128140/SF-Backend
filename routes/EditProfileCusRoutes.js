import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

// Route to get profile information
router.get('/:id', async (req, res) => {
  try {
    
    const id = req.params.id;

    const profileInfo = await RegisCus.findById(id);

    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to save profile information
router.put('/', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password } = req.body;
    const userId = req.userId;

    // Find the user by their ID
    const user = await RegisCus.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile information
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.emailAddress = emailAddress || user.emailAddress;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password || user.password;

    const savedProfile = await user.save();

    res.status(200).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); // Handle any errors
  }
});

// Route to delete the profile
router.delete('/', async (req, res) => {
  try {
    const userId = req.userId; 

    // Find the user by their ID
    const user = await RegisCus.findById(userId);

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