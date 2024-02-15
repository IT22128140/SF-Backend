import mongoose from "mongoose";

const storeproductSchema = mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: true,
        },
        
    },
    {
        timestamps: true,
    }

);

export const StoreProduct = mongoose.model('Customer', storeproductSchema);