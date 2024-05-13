import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
    {
        empId: {
            type: String,
            required: true
        },
        generatedEmpId: {
            type: String,
            required: true
        },
        departure: {
            type: Date,
            required: false
        },
        // late: {
        //     type: Boolean,
        //     required: true
        // }
    },
    {
        timestamps: true,
    }
);

export const Attendance = mongoose.model('Attendance', attendanceSchema);