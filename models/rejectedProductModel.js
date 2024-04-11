import mongoose from "mongoose";

const rejectedProductSchema = mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true,
        },
        rejectDate: {
            type: Date,
            required: true,
        },
        defect: {
            type: String,
            required: true,
        },
        customer_ID: {
            type: String,
        },
        qC_Manager_ID: {
            type: String,
            required: true,
            default: "PM_ID",
        }
    }
);

export const RejectedProduct = mongoose.model('rejectedProduct',rejectedProductSchema);