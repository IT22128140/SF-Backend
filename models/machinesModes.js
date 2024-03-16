import mongoose from "mongoose";

const machinesSchema = mongoose.Schema(
    {
        MachineName: {
            type: String,
            required: true,
        },
    
        PurchasedDate: {
            type: Date,
            required: true,
        },
    
        Condition: {
            type: String,
            required: true,
        },
    
        Cost: {
            type: String,
            required: true,
        },
    
        Quantity: {
            type: Number,
            required: true,
        },
    
        Manufacturer: {
         type: String,
         required: true,
        },

        Category: {
            typr: String,
            required: true,
        }
    
    },
    {
        timestamps: true,
    }
    );

export const Machine = mongoose.model('Machine', machinesSchema);