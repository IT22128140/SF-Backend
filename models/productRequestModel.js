import mongoose from "mongoose";

const productRequestSchema = mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        requestedDate: {
            type: Date,
            required: true,
        },
        acceptStatus: {
            type: String,
            required: true,
            default: "pending",
        },
        inspectionStatus: {
            type: String,
            required: true,
            default: "pending",
        },
        productionManagerID: {
            type: String,
            required: true,
            default: "PM_ID",
        }
    },
    {
        timestamps: true,
    }
);

export const ProductRequest = mongoose.model('productRequest',productRequestSchema); 