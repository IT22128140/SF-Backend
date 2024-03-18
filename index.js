import express, { request, response } from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose, { pluralize } from "mongoose";
import { Repair } from "./models/repairModel.js";
import repairsRoute from './routes/repairsRoute.js';
import { Machine } from "./models/machinesModes.js";
import machinesRoute from './routes/machinesRoute.js';
import mprShortagesRoute from './routes/mprShortagesRoute.js';

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use('/repairs', repairsRoute);
app.use('/machines', machinesRoute);
app.use('/mpshortages', mprShortagesRoute);

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
