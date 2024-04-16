import express from "express";
import { Employee } from "../models/employeeModel.js";

const router = express.Router();

router.get("/:occupation", async (req, res) => {
  try {
    const { occupation } = req.params;
    const employee = await Employee.find({occupation:occupation});
    return res.status(200).json(employee.length);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;