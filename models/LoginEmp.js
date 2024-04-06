import mongoose from "mongoose";

const LoginEmp = mongoose.Schema({
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
  
  const User = mongoose.model('User', userSchema);
  export const user = mongoose.model('user' ,LoginEmp);