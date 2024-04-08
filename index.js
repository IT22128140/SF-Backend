import express, { request } from "express";                        // Importing express
import mongoose from "mongoose";                     // Importing mongoose for MongoDB interaction
import { PORT, MONGO_URI } from "./config.js";      // Importing PORT and MONGO_URI from configuration
import { Sup } from "./models/SupplierDetails.js"; // Importing SupplierDetails model
import { RM } from "./models/RMStock.js";
import SupplierDetailsroutes from "./routes/SupplierDetailsroutes.js";
import RMStockRoutes from "./routes/RMStockRoutes.js";
import MachinePartRoutes from "./routes/MachinePartRoutes.js";
import RequestFillingRoutes from "./routes/RequestFillingRoutes.js"

const app = express();                             // Creating an Express application instance

app.use(express.json());                           // Middleware to parse JSON bodies of incoming requests

// Route handler for the root URL
app.get("/", (req, res) => {
  console.log(req);                                 // Logging the request object
  return res.status(234).send("Welcome To MERN Stack Tutorial");         // Sending a response
});



app.get('/RMstock/search/:key', async (req, res) => {
  console.log(req.params.key);
  try {
    let data = await products.find({
      "$or": [
        { materialType: { $regex: req.params.key },
            colorAndDesign: { $regex: req.params.key } }
      ]
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.use('/supdetails', SupplierDetailsroutes);
app.use('/RMstock', RMStockRoutes);
app.use('/mpstock', MachinePartRoutes);
app.use('/ReqFF', RequestFillingRoutes);

// Connecting to MongoDB and starting the server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error: ", error);                                    // Logging MongoDB connection error
  });
