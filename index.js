import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
//enter your imports under your name. don't add or delete empty spaces
//Sageevan
import productRequestRoute from "./routes/productRequestRoute.js";//sageevanRoute 1/4
import productReviewRoute from "./routes/productReviewRoute.js";//sageevanRoute 2/4
import rejectedProductRoute from "./routes/rejectedProductRoute.js";//sageevanRoute 3/4
import releaseProductRoute from "./routes/releaseProductRoute.js";//sageevanRoute 4/4






//Varagan










//Hiranya









//Ridmi










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
app.use('/qualityControl/productRequest',productRequestRoute);
app.use('/qualityControl/productReview',productReviewRoute);
app.use('/qualityControl/releaseProduct',releaseProductRoute);
app.use('/qualityControl/rejectedProduct',rejectedProductRoute);






//Hiranya









//Ridmi










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