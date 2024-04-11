import mongoose from "mongoose";

const suppRawsSchema = mongoose.Schema(
    {
        supplierID: {
            type: String,
            required: true,
        },
      
        fabricType_Colour_Quantity: {
            type: String,
            required: true,
        },
        button_Colour_Quantity: {
            type: String,
            required: true,
        },
        thread_Colour_Quantity:{
            type: String,
            required: true,
        },
        other_Materials:{
            type: String,
            required: true,
        },
        recivedDate:{
            type: Date,
            required:true
        },
    },
);

export const suppRaws = mongoose.model('suppRaws',suppRawsSchema);