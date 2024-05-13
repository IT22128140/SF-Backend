import express from "express";
import { Attendance } from "../models/attendanceModel.js";
// import { Employee } from "../models/employeeModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.empId || !req.body.generatedEmpId) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const newAttendance = new Attendance({
      empId: req.body.empId,
      generatedEmpId: req.body.generatedEmpId,
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
    // const attendance = await Attendance.find({});
    const { date } = req.query;
    let attendance;
    if (date) {
      // attendance = await Attendance.find({ date: new Date(date) });
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setDate(endOfDay.getDate() + 1);
      attendance = await Attendance.find({
        createdAt: {
          $gte: startOfDay.toISOString(),
          $lt: endOfDay.toISOString(),
        },
      });
    } else {
      attendance = await Attendance.find({});
    }
    return res.status(200).json({
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// router.get("/:empId", async (req, res) => {
//     try {
//         const { empId } = req.params;
//         const attendance = await Attendance.findById(empId);
//         return res.status(200).json(attendance);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ message: error.message });
//     }
// });

router.put("/:empId", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const date1 = new Date();
    const { empId } = req.params;
    // const attendance = await Attendance.findOneAndUpdate({ empId: empId, createdAt: date });
    const attendance = await Attendance.findOne({
      empId: empId,
      createdAt: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!attendance) {
      return res.status(400).send({ message: "No attendance found" });
    }
    const updateattendance = await Attendance.findByIdAndUpdate(
      attendance._id,
      { departure: date1
        
       }
    );

    return res.status(200).json(updateattendance);
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
