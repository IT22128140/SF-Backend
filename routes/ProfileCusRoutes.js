import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

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

export default router;