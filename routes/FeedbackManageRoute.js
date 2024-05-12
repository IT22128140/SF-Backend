// backend.js
import express from 'express';
import { Feedback } from '../models/Feedback.js';

const router = express.Router();

// Route to get all feedbacks from the database
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;