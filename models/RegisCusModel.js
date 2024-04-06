import mongoose from "mongoose";

const RegisCusModelSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      emailAddress: {
        type: String,
        required: true,
        unique: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
  });
  
  export const RegisCusModel = mongoose.model('LoginEmp', RegisCusModelSchema);

  