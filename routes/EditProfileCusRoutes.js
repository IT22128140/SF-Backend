import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

// Route to get profile information
router.get('/:id', async (req, res) => {
  try {
    
    const id = req.params.id;

    const profileInfo = await RegisCus.findById(id);

    if (!profileInfo) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to save profile information
router.put('/:id', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password } = req.body;
    const id = req.params.id;

    const user = await RegisCus.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile information
    user.firstName = FirstName || user.firstName;
    user.lastName = LastName || user.lastName;
    user.email = emailAddress || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password || user.password;

    const savedProfile = await user.save();

    res.status(200).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete the profile
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by their ID
    const user = await RegisCus.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's profile
    await RegisCus.findByIdAndDelete(id);

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;