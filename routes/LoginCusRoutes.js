import express from 'express';
import { RegisCus } from '../models/RegisCusModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { emailAddress, password } = req.body;
  try {
    const user = await RegisCus.findOne({ emailAddress: emailAddress });
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("No record exists");
    }
  } catch (err) {
    res.json(err);
  }
});

export default router;