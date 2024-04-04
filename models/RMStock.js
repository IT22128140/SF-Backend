import mongoose from "mongoose";

const AvailableRMS = mongoose.Schema(
     {
        
       
        materialType:{
            type:String,
            required: true,
        },
          colorAndDesign:{
            type:String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        }
       
     }
);

export const RM = mongoose.model('RM' ,AvailableRMS);
