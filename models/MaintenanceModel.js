import mongoose from "mongoose";

const maintenanceSchema = mongoose.Schema(

    {
        Date: {
            type: Date,
            required: true,
        },

        SewingMachine: [
            {
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
                }

            }
        ],
    }

)

export const Maintenance = mongoose.model('Maintenance', maintenanceSchema);