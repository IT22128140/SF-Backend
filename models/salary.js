import mongoose from "mongoose";

const salarySchema =  mongoose.Schema(
    {
      name: {
         type: String,
         required: true,
     },
  
    time: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    attendance: {
        type: Number,
        required: true,
    },
    overtime: {
        type: Number,
        required: true,
    },
    bonus: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    notice: {
        type: String,
        required: true,
    },
    cheques: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    },
    {
        timestamps: true,
});

export const Salary = mongoose.model("salary", salarySchema);