import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema(

    {
        MaintenanceID: {
            type: String,
            required: true,
        },

        Date: {
            type: Date,
            required: true,
        },

        MachineID: {
            type: String,
            required: true,
        },

        MachineName: {
            type: String,
            required: true,
        },

        Category: {
            type: String,
            required: true,
        },

        Machineparts: [
            {
                partID:{
                    type:String,
                    required: true,
                },
               
                partName:{
                    type:String,
                    required: true,
                },

                condition:{
                    type: String,
                    required: true,
                },

                
                
            }
        ],

        ChangedMotor:
        {
            type: String,
            required: true,
        },

        ChangedNeedle:
        {
            type: String,
            required: true,
        },

        Oiled:
        {
            type: String,
            required: true,
        },
    }

)

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);