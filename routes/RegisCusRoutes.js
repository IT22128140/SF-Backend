import express from 'express';
import {RegisCus} from '../models/RegisCusModel.js';


const router = express.Router();


// POST - Register a new user
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email, password });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  
  export default router;