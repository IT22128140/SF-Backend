import mongoose from "mongoose";

const mprShortagesSchema = mongoose.Schema(
    {
        RequestID: {
            type: String,
            required: true,
        },

        PartID: {
            type: String,
            required: true,
        },

        PartName: {
            type: String,
            required: true,
        },
    
        Description: {
            type: String,
            required: true,
        },
    
        Quantity: {
            type: Number,
            required: true,
        },
    
        Condition: {
         type: String,
         required: true,
        },

        NeededBeforeDate: {
            type: Date,
            required: true,
        },
    
    },
    {
        timestamps: true,
    }
    );

export const PartShortage = mongoose.model('PartShortage', mprShortagesSchema);