import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
//enter your imports under your name. don't add or delete empty spaces
//Sageevan










//Varagan










//Hiranya









//Ridmi
import { rmRequest } from "./models/rmRequestModel.js";
import rmRequestRoute from './routes/rmRequestRoute.js';
import { rmDistribute } from "./models/rmDistributeModel.js";
import rmDistributeRoute from './routes/rmDistributeRoute.js';
import { empPerformance } from "./models/empPerformanceModel.js";
import empPerformanceRoute from './routes/empPerformanceRoute.js';




//Isuru










//Gihan









//









//Maneth











//connection
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Connection Successful!");
});

//enter your routes under your name. don't add or delete empty spaces
//Varagan










//Sageevan










//Hiranya









//Ridmi
app.use('/rmRequests', rmRequestRoute);
app.use('/rmDistributes', rmDistributeRoute);
app.use('/empPerformances', empPerformanceRoute);







//Isuru










//Gihan









//Sandithi









//Maneth














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
