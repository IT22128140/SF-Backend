// import express from 'express';

// const router = express.Router();

// router.get('/profile', async (req, res) => {
//   try {
//     const profileInfo = {
//       FirstName: 'John',
//       LastName: 'Doe',
//       emailAddress: 'john.doe@example.com',
//       phoneNumber: '555-1234',
//       password: '*********'
//     };

//     res.status(200).json(profileInfo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' }); 
//   }
// });

// export default router;

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