import express from 'express';
import { RFF } from '../models/RequestFillingModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Validation checks for request body fields

    const RFf = {
        requstId: req.body.requstId,
      fabricType: req.body.fabricType,
      buttonType: req.body.buttonType,
      threadType: req.body.threadType,
      otherMaterial: req.body.otherMaterial,
      fillingDate: req.body.fillingDate
    };

    const Rff = await RFF.create(RFf);
    return res.status(201).json(Rff);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reqF = await RFF.find({});
    return res.status(200).json(reqF);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const RDlt = await RFF.findByIdAndDelete(id);
    if (!RDlt) {
      return res.status(404).json({ message: 'Request not found' });
    }
    return res.status(200).json({ message: "Request removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
