import mongoose from "mongoose";

const garmentProductSchema = mongoose.Schema(
    {
        productCode: {
            type: String,
        },
        fabricType: {
            type: String,
        },
        color: {
            type: String,
        },
        stitchingType: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        productionManagerID: {
            type: String,
            default: "PM_ID",
        }
    },
    {
        timestamps: true,
    }
);


export const GarmentProduct = mongoose.model('garmentProduct', garmentProductSchema);