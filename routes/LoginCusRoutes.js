import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const user = await RegisCus.findOne({ emailAddress: emailAddress, password: password });
    return res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

export default router;