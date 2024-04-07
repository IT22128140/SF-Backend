import express from "express";
import { Employee } from "../models/employeeModel.js";
// import { Resign } from "../models/resignModel.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate( id, req.body);
} catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/fired", async (req, res) => {
  try {
    const employees = await Employee.find({ employeeStatus: "Fired"});
    return res.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/resigned", async (req, res) => {
  try {
    const employees = await Employee.find({ employeeStatus: "Resigned"});
    return res.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
