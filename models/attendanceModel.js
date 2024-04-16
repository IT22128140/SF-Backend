import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            // defualt: "Present"
        }
    },
    {   
        timestamps: true
    }
);

export const Attendance = mongoose.model('Attendance', attendanceSchema);