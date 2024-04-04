import mongoose from "mongoose";

const repairsSchema = mongoose.Schema(
    {
        RepairID: {
            type: String,
            required: true,
        },
        
        RepairDescription: {
            type: String,
            required: true,
        },
    
        RequestedDate: {
            type: Date,
            required: true,
        },
    
        RequestedTime: {
            type: String,
            required: true,
        },
    
        UrgencyLevel: {
            type: String,
            required: true,
        },
    
        Status: {
            type: String,
            required: true,
        },
    
        CompletedDate: {
         type: String,
         required: true,
        },
    
    },
    {
        timestamps: true,
    }
    );

export const Repair = mongoose.model('Repair', repairsSchema);