import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { emailAddress, password, employeeType } = req.body;
  try {
    const user = await RegisEmp.findOne({ emailAddress: emailAddress, password: password, employeeType:employeeType });
    return res.status(200).json(user);
  } catch (err) {
    res.json(err);
  }
});

export default router;