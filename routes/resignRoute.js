import express from "express";
import { Employee } from "../models/employeeModel.js";
import { Resign } from "../models/resignModel.js";

const router = express.Router();

router.put("/statusUpdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStatus = await Resign.findByIdAndUpdate(id, req.body);
    if (!updatedStatus) {
        return res.status(404).send({ message: "Request not found" });
      }
      return res.status(200).send({ message: "Status updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/rejected", async (req, res) => {
    try {
      const resigns = await Resign.find({ status: "Rejected" });
      return res.status(200).json(resigns);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.empID ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.type ||
      !req.body.reason 
    ) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const newResign = new Resign({
      empID: req.body.empID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type,
      reason: req.body.reason
    });
    const resign = await Resign.create(newResign);
    return res.status(201).send(resign);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const resigns = await Resign.find({ status: "Pending" });
    return res.status(200).json(resigns);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
