import express from "express";
import { Feedback } from "../models/Feedback.js";

const router = express.Router();

router.post('/feedback', async (req, res) => {
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

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get feedbacks' });
  }
});

export default router;