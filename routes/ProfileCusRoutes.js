import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.userId;
    
    const user = await RegisCus.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const profileInfo = {
      FirstName: user.FirstName,
      LastName: user.LastName,
      emailAddress: user.emailAddress,
      phoneNumber: user.phoneNumber,
      password: '*********'
    };

    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;