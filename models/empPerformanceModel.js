import mongoose from "mongoose";

const empPerformanceSchema = mongoose.Schema(
    {
        EmployeeID: {
            type: String,
            required: true,
        },
        LineNumber: {
            type: String,
            required: true,
        },
        PositionNumber: {
            type: String,
            required: true,
        },
        StandardMinuteValue: {
            type: Number,
            required: true,
        },
        WorkingHours:{
            type: Number,
            required: true,
        },
        // CalculatedEfficiency:{
        //     type: Number,
        //     required: true,
        // },
        OtherNotes:{
            type: String,
            required:true
        },
    },
    {
        timestamps: true,
    }
);

export const empPerformance = mongoose.model('empPerformance',empPerformanceSchema);