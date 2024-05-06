import mongoose from "mongoose";

const salarySchema =  mongoose.Schema(
    {
      lastName: {
         type: String,
         required: true,
     },
     employeeID: {
        type: String,
        required: true,
      },
  
    // time: {
    //     type: String,
    //     required: true,
    // },
    firstName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    email: {
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
    // notice: {
    //     type: String,
    //     required: false,
    // },
    // cheque1: {
    //     type: String,
    //     required: false,
    // },
    // cheque2: {
    //     type: String,
    //     required: false,
    // },
    // profile: {
    //     type: String,
    //     required: false,
    // },
    },
    {
        timestamps: true,
});

export const Salary = mongoose.model("salary", salarySchema);