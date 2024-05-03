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
      password2: {
        type: String,
        required: true
      },
  });
  
  export const RegisCus = mongoose.model('RegisCus', RegisCusModelSchema);

  