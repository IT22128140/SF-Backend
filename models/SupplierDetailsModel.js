import mongoose from "mongoose";

const supplierDetails = mongoose.Schema(
     {
        SrequestID: {
            type: String,
            required: true,
        },  
        supplierName:{
            type:String,
            required: true,
        },
        address:{
            type:String,
            required: true,
        },
        contactNumber:{
            type: Number,
            required: true,
        },
        email: {
           type: String,
           required: true,
        },
        supplierType:{
           type: String,
           required: true,
        },
        contractExpiary:{
            type: Date,
            required: true,
        },
     }
);

export const Sup = mongoose.model('Sup' ,supplierDetails);
