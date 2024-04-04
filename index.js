import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import employeeRoute from "./routes/employeeRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import occupationRoute from "./routes/occupationRoute.js";
import cors from "cors";
import SupplierDetailsroutes from "./routes/SupplierDetailsroutes.js";
import RMStockRoutes from "./routes/RMStockRoutes.js";
import MachinePartRoutes from "./routes/MachinePartRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Connection Successful!");
});

app.use("/employee", employeeRoute);
app.use("/attendance", attendanceRoute);
app.use("/occupation", occupationRoute);
app.use('/supdetails', SupplierDetailsroutes);
app.use('/RMstock', RMStockRoutes);
app.use('/mpstock', MachinePartRoutes);

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
