import mongoose from "mongoose";

const rmDistributeSchema = mongoose.Schema(
    {
        DistributeID : {
            type : String,
            required : true,
        },
        LineNumber: {
            type: String,
            required: true,
        },
        PositionNumber: {
            type: String,
            required: true,
        },
        Distributed:{
            type: String,
            required: true,
        },
        Shortage:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const rmDistribute = mongoose.model('rmDistribute',rmDistributeSchema);