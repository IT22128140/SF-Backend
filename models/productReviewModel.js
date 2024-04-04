import mongoose from "mongoose";

const productReviewSchema = mongoose.Schema(
    {
        productCode: {
            type: String,
            required: true,
        },
        inspectionResult: {
            type: String,
            required: true,
        },
        reviewDate: {
            type: Date,
            required: true,
        },
        defects: {
            type: String,
        },
        qC_Manager_ID: {
            type: String,
            required: true,
            default: "PM_ID",
        }
    }
);

export const ProductReview = mongoose.model('productReview',productReviewSchema);