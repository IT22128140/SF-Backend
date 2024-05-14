// import express from 'express';
// import { RegisCus } from '../models/RegisCusModel.js';

// const router = express.Router();

// router.post('/RegisCus', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Need Add  login logic here
//     const user = await RegisCus.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
//     }

//     if (password !== user.password) {
//       return res.status(401).json({ message: 'Invalid email or password. Please try again.' });
//     }

//     // Generate token for authentication 
//     const token = generateToken();

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// function generateToken() {
//   // Implement your token generation logic here
// }

// export default router;

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