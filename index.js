import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
//enter your imports under your name. don't add or delete empty spaces
//Sageevan










//Varagan










//Hiranya
import repairsRoute from './routes/repairsRoute.js';
import machinesRoute from './routes/machinesRoute.js';
import mprShortagesRoute from './routes/mprShortagesRoute.js';






//Ridmi










//Isuru











//Gihan









//Sandithi









//Maneth
import itemsRoute from "./routes/itemsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import deliveryRoute from "./routes/deliveryDetailsRoute.js";
import mongoose from "mongoose";
import cors from "cors";







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
app.use('/repairs', repairsRoute);
app.use('/machines', machinesRoute);
app.use('/mpshortages', mprShortagesRoute);






//Ridmi










//Isuru










//Gihan









//Sandithi









//Maneth
app.use("/items", itemsRoute);
app.use("/cart", cartRoute);
app.use("/deliveryDetails", deliveryRoute);












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
