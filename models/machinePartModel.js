import mongoose from "mongoose";

const MachineParts = mongoose.Schema(
     {
        
        partID:{
            type:String,
            required: true,
        },
       
        partName:{
            type:String,
            required: true,
        },
          purchasedDate:{
            type:Date,
            required: true,
        },
        condition:{
            type: String,
            required: true,
        },
        costPerUnit:{
            type: Number,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        manufacturer:{
            type:String,
            required: true,
        }
     }
);

export const MP = mongoose.model('MP' ,MachineParts);