import express from 'express';
import {suppRaws} from '../models/suppRawsModel.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try {
      const supR = {
          supplierID: req.body.supplierID,
          fabricType_Colour_Quantity: req.body.fabricType_Colour_Quantity,
          button_Colour_Quantity: req.body.button_Colour_Quantity,
          thread_Colour_Quantity: req.body.thread_Colour_Quantity,
          other_Materials: req.body.other_Materials,
          recivedDate: req.body.recivedDate,
      };
  
      const supRM = await suppRaws.create(supR); // Use supR instead of supRM
      return res.status(201).json(supRM);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  });

router.get('/', async (req, res) => {
  try {
    const SupRM = await suppRaws.find({});
    return res.status(200).json(SupRM);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const Suprm = await suppRaws.findByIdAndDelete(id);
    if (!Suprm) {
      return res.status(404).json({ message: 'Request not found' });
    }
    return res.status(200).json({ message: "Request removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
