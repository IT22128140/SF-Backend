import mongoose from "mongoose";

const RegisEmpSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    enum: ['HR_Manager', 'Stock_Manager', 'Repair_Manager', 'Process_Manager', 'Quality_Control_Manager', 'Store_Manager'],
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

export const RegisEmp = mongoose.model('RegisEmp', RegisEmpSchema);