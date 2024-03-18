import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import { rmRequest } from "./models/rmRequestModel.js";
import rmRequestRoute from './routes/rmRequestRoute.js';
import { rmDistribute } from "./models/rmDistributeModel.js";
import rmDistributeRoute from './routes/rmDistributeRoute.js';
import { empPerformance } from "./models/empPerformanceModel.js";
import empPerformanceRoute from './routes/empPerformanceRoute.js';
import cors from 'cors';


const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option1 : Allow all origins with default of cors(*)
// app.use(cors());
//Option2 : Allow csutom origins
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use('/rmRequests', rmRequestRoute);
app.use('/rmDistributes', rmDistributeRoute);
app.use('/empPerformances', empPerformanceRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error: ", error);
  });
