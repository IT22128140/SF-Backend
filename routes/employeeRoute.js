import express from "express";
import { Employee } from "../models/employeeModel.js";

const router = express.Router();

// router.get("/:occupation", async (req, res) => {
//   try {
//     const { occupation } = req.params;
//     const employee = await Employee.find({occupation:occupation});
//     return res.status(200).json(employee.length);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.employeeID ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.nic ||
      !req.body.address ||
      !req.body.email ||
      !req.body.contactNo ||
      !req.body.dateOfBirth ||
      !req.body.age ||
      !req.body.occupation ||
      !req.body.basicSalary ||
      !req.body.admissionDate ||
      !req.body.count
    ) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const newEmployee = new Employee({
      employeeID: req.body.employeeID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nic: req.body.nic,
      address: req.body.address,
      email: req.body.email,
      contactNo: req.body.contactNo,
      dateOfBirth: req.body.dateOfBirth,      
      age: req.body.age,
      occupation: req.body.occupation,
      basicSalary: req.body.basicSalary,
      admissionDate: req.body.admissionDate,
      count: req.body.count,
    });
    const employee = await Employee.create(newEmployee);
    return res.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json({
      count: employees.length,
      data: employees,
    });
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

router.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.nic ||
      !req.body.address ||
      !req.body.email ||
      !req.body.contactNo ||
      !req.body.dateOfBirth ||
      !req.body.age ||
      !req.body.occupation ||
      !req.body.basicSalary ||
      !req.body.admissionDate
    ) {
      return res.status(400).send({ message: "Request body is missing" });
    }
    const { id } = req.params;
    const result = await Employee.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Employee not found" });
    }
    return res.status(200).send({ message: "Employee updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
