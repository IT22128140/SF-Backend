import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/", async (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await RegisCus.findOne({ emailAddress });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ emailAddress: user.emailAddress }, process.env.KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    
    return res.json({ status: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;