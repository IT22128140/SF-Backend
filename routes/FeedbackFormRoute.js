import express from "express";
import { Feedback } from "../models/Feedback.js";

const router = express.Router();

router.post('/Feedback', async (req, res) => {
  try {
    const { name, email, feedback, rating, image } = req.body;
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
      rating,
      image
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});

export default router;