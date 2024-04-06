import mongoose from "mongoose";

const LoginEmpSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['HR_Manager', 'Stock_Manager', 'Repair_Manager', 'Process_Manager', 'Quality_Control_Manager', 'Store_Manager'],
      required: true
    }
  });
  
  export const LoginEmp = mongoose.model('LoginEmp', LoginEmpSchema);

  