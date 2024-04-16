import express from "express";
import { Attendance } from "../models/attendanceModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.employeeId || !req.body.status) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const newAttendance = new Attendance({
      employeeId: req.body.employeeId,
      status: req.body.status,
    });
    const attendance = await Attendance.create(newAttendance);
    return res.status(201).send(attendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find({});
    return res.status(200).json({
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findById(id);
        return res.status(200).json(attendance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndUpdate(id, req.body);
        return res.status(200).json(attendance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByIdAndDelete(id);
        return res.status(200).json(attendance);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;