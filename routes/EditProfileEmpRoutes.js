// import express from 'express';
// import RegisEmp from '../models/RegisCusModel.js';


// const router = express.Router();


// // Route to save profile information
// router.post('/profile/save', async (req, res) => {
//   try {
//     const { FirstName, LastName, emailAddress, phoneNumber, password } = req.body;

//     // Save the profile information to the database using the RegisCus model
//     const newProfile = new RegisEmp({
//       FirstName,
//       LastName,
//       emailAddress,
//       phoneNumber,
//       employeeType,
//       password
//     });

//     const savedProfile = await newProfile.save();

//     res.status(201).json(savedProfile);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' }); // Handle any errors
//   }
// });

// // Route to delete the profile
// router.delete('/profile/delete', async (req, res) => {
//   try {
//     // Need to add code to delete the profile information from the database using the RegisEmp model
//     res.json({ message: 'Profile deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' }); // Handle any errors
//   }
// });

// export default router;

import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

// route to get profile information
router.get('/:id', async (req, res) => {
  try {
    
    const id = req.params.id;

    const profileInfo = await RegisEmp.findById(id);

    if (!profileInfo) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profileInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to save profile information
router.put('/:id', async (req, res) => {
  try {
    const { FirstName, LastName, emailAddress, phoneNumber, password, employeeType } = req.body;
    const id = req.params.id;

    const user = await RegisEmp.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile information
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.emailAddress = emailAddress || user.emailAddress;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password || user.password;
    user.employeeType = employeeType || user.employeeType;

    const savedProfile = await user.save();

    res.status(200).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to delete the profile
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by their ID
    const user = await RegisEmp.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user's profile
    await RegisEmp.findByIdAndDelete(id);

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;