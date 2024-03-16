import mongoose from "mongoose";

const rmRequestSchema = mongoose.Schema(
    {
        Date: {
            type: Date,
            required: true,
        },
        FabricType_Colour_Amount: {
            type: String,
            required: true,
        },
        ButtonType_Colour_Amount: {
            type: String,
            required: true,
        },
        ThreadType_Colour_Amount:{
            type: String,
            required: true,
        },
        Other_Materials:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const rmRequest = mongoose.model('rmRequest',rmRequestSchema);