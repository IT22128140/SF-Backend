import express from 'express';
import { Feedback } from "../models/Feedback.js";
import nodemailer from 'nodemailer';

const router = express.Router();

// Route to get all feedbacks from the database
router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to contact a user based on their feedback
router.post('/contact', async (req, res) => {
  const { name, email } = req.body;

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Feedback Received',
    text: `Hello ${name},\n\nThank you for providing your feedback. We appreciate your input.`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.json({ message: `Contacting ${name} at ${email} regarding their feedback` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;