import express, { request } from "express";                        // Importing express
import mongoose from "mongoose";                     // Importing mongoose for MongoDB interaction
import { PORT, MONGO_URI } from "./config.js";      // Importing PORT and MONGO_URI from configuration
import cors from "cors";
//enter your imports under your name. don't add or delete empty spaces
//Sageevan








//Varagan
import FeedbackFormRoutes from "./routes/FeedbackFormRoutes.js";
import FeedbackManageRoutes from "./routes/FeedbackManageRoutes.js";
import LoginCusRoutes from "./routes/LoginCusRoutes.js";
import LoginEmpRoutes from "./routes/LoginEmpRoutes.js";
import RegisCusRoutes from "./routes/RegisCusRoutes.js";
import RegisEmpRoutes from "./routes/RegisEmpRoutes.js";
import ProfileCusRoutes from "./routes/ProfileCusRoutes.js";
import ProfileEmpRoutes from "./routes/ProfileEmpRoutes.js";
//import EditProfileCusRoutes from "./routes/EditProfileCusRoutes.js";
//import EditProfileEmpRoutes from "./routes/EditProfileEmpRoutes.js";








//Hiranya







//Ridmi






//Isuru









//Gihan









//Sandithi




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
app.use("/feedback", FeedbackFormRoutes);
app.use("/feedbacks", FeedbackManageRoutes);
app.use("/LoginCus", LoginCusRoutes);
app.use("/RegisCus", RegisCusRoutes);
app.use("/ProfileCus", ProfileCusRoutes);
//app.use("/RegisCusModel", EditProfileCusRoutes);
app.use("/LoginEmp", LoginEmpRoutes);
app.use("/RegisEmp", RegisEmpRoutes);
app.use("/ProfileEmp", ProfileEmpRoutes);
//app.use("/RegisEmpModel", EditProfileEmpRoutes);









//Sageevan





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