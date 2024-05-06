import mongoose from "mongoose";

const AvailableRMS = mongoose.Schema(
     {
        
        materialID: {
            type: String,
            required: true,
        },
        materialType:{
            type:String,
            required: true,
        },
          colorAndDesign:{
            type:String,
            required: true,
        },
        initialquantity:{
            type: Number,
            required: true,
        }, 
        
        costperunit:{
            type: Number,
            required: true,
        },
         restockingdate:{
            type: Date,
            required: true,
        },
        availablequantity:{
            type: Number,
            required: true,
        }
      
     }
);

export const RM = mongoose.model('RM' ,AvailableRMS);
