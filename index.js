import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import salaryRouter from "./routes/salaryemp.js";
import paymentRouter from "./routes/paymentcus.js";
import editsalary from "./routes/editsalary.js"
import cors from "cors";  
import chequeimage from "./routes/chequeimage.js";






const app = express();

app.use(express.json());
app.use(cors());





app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Connection successful!");
});

app.use('/salary', salaryRouter);
app.use('/payment', paymentRouter);
app.use('/editsalary', editsalary);
app.use('/uploads',chequeimage);




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
