import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize your database connection; modify the URI as needed for your environment
const mongoURI = 'mongodb+srv://dewpuramaneth:UBLB8VK9qkDioyBS@itp24-b2-11.5ideszn.mongodb.net/SerendibFashion-DB?retryWrites=true&w=majority'; 
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
const AutoIncrement = AutoIncrementFactory(connection);

const productRequestSchema = mongoose.Schema(
    {
        productCode: {
            type: String,
        },
        fabricType: {
            type: String,
        },
        color: {
            type: String,
        },
        stitchingType: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        acceptStatus: {
            type: String,
            default: "pending",
        },
        inspectionStatus: {
            type: String,
            default: "pending",
        },
        productionManagerID: {
            type: String,
            default: "PM_ID",
        }
    },
    {
        timestamps: true,
    }
);

// Apply the auto-increment plugin to the ProductRequest schema
productRequestSchema.plugin(AutoIncrement, {
    id: 'productRequest_id_counter', // Identifier for the sequence
    inc_field: 'requestId'    // Field to increment
});

// Create the model from the schema
export const ProductRequest = mongoose.model('productRequest', productRequestSchema);