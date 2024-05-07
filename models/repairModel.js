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

        Workers: [

            {
                employeeID: {
                    type: String,
                    required: true,
                  },

                  firstName: {
                    type: String,
                    required: true,
                  },
                  
                  lastName: {
                    type: String,
                    required: true,
                  },
            }
        ],
           
        CompletedDate: {
         type: Date,
         required: true,
        },
    
    },
    {
        timestamps: true,
    }
    );

export const Repair = mongoose.model('Repair', repairsSchema);