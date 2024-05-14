// import express from 'express';


// const router = express.Router();

// const feedbacks = [
//   { feedback: 'Great job!', rating: 5, name: 'John Doe', email: 'johndoe@example.com' },
//   { feedback: 'Very helpful', rating: 4, name: 'Jane Smith', email: 'janesmith@example.com' },
//   { feedback: 'Nice work', rating: 3, name: 'Alex Johnson', email: 'alexjohnson@example.com' }
// ];

// // Route to get all feedbacks
// router.get('/feedbacks', (req, res) => {
//   res.json(feedbacks);
// });

// // Route to contact a user based on their feedback
// router.post('/contact', (req, res) => {
//   const { name, email } = req.body;
//   // need to add your logic here to handle contacting the user
//   res.json({ message: `Contacting ${name} at ${email} regarding their feedback` });
// });

// export default router;


import express from 'express';
import { Feedback } from '../models/Feedback.js';

const router = express.Router();

// Route to get all feedbacks from the database
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findOneAndDelete({ id: id });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;