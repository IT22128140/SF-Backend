import mongoose from "mongoose";

const releaseProductSchema = mongoose.Schema(
    {
        release_ID: {
            type: String,
            required: true,
        },
        productCode: {
            type: String,
            required: true,
        },
        customerID: {
            type: String,
            
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        reject_Date: {
            type: Date,
        },
        rejectedReason: {
            type: String,
        },
        qC_Manager_ID: {
            type: String,
            default: "PM_ID",
        }
    }
);

export const ReleaseProduct = mongoose.model('releaseProduct',releaseProductSchema); 