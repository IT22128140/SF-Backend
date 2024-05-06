import mongoose from "mongoose";

const paymentSchema =  mongoose.Schema(
    {
      fullName: {
         type: String,
         required: true,
     },

     totalpayment: {
        type: Number,
        required: true,
    },
  
    phoneNumber:{
        type: Number,
        required: true,

    },
    emailAddress:{
        type: String,
        required:true,
    },
    bankName:{
        type: String,
        required:true,
    },
    branchName:{
        type: String,
        required:true,
    },
    
    },
    {
        timestamps: true,
});

export const Payment = mongoose.model("payment", paymentSchema); 