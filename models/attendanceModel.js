import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const attendanceSchema = mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            defualt: "Absent"
        },
        date: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: String,
            required: true
        },
        departureTime: {
            type: String,
            required: false
        },
        overTimeHours: {
            type: Number,
            required: false
        },
        late: {
            type: Boolean,
            required: true
        }
    },
    {   
        timestamps: true
    }
);

export const Attendance = mongoose.model('Attendance', attendanceSchema);