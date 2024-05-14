// import express from 'express';

// const router = express.Router();

// router.get('/profile', async (req, res) => {
//   try {
//     const profileInfo = {
//       FirstName: 'John',
//       LastName: 'Doe',
//       emailAddress: 'john.doe@example.com',
//       phoneNumber: '555-1234',
//       employeeType: 'HR_Manager',
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
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    
    const id = req.params.id;

    const profileInfo = await RegisEmp.findById(id);

    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;