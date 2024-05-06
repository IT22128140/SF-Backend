import mongoose from "mongoose";

const machinesSchema = mongoose.Schema(
    {
        MachineID: {
            type: String,
            required: true,
        },

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
            type: Number,
            required: true,
        },
    
        Manufacturer: {
         type: String,
         required: true,
        },

        Category: {
            type: String,
            required: true,
        }
    
    },
    {
        timestamps: true,
    }
    );

export const Machine = mongoose.model('Machine', machinesSchema);