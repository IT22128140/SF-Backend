import express from 'express';
import { RegisEmp } from '../models/RegisEmpModel.js';

const router = express.Router();

router.post("/", async (req, res) => {
  const { emailAddress, password, employeeType } = req.body;
  try {
    const user = await RegisEmp.findOne({ emailAddress: emailAddress });
    if (user) {
      if (user.password === password && user.employeeType === employeeType) {
        res.json("Success");
      } else {
        res.json("Incorrect password or employeeType");
      }
    } else {
      res.json("No record exists");
    }
  } catch (err) {
    res.json(err);
  }
});



export default router;