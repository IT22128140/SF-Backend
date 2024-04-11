import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  employeeStatus: {
    type: String,
    required: true,
    default: "Active",
  },
  count: {
    type: Number,
    required: true,
  }
});

export const Employee = mongoose.model("Employee", employeeSchema);
