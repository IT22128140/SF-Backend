import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import { Salary } from "./models/salary.js";
import salaryRouter from "./routes/salaryemp.js";
import { Payment } from "./models/custompay.js";
import paymentRouter from "./routes/paymentcus.js";



const app = express();

app.use(express.json());



app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use('/salary', salaryRouter);
app.use('/payment', paymentRouter);
app.use('/search', salaryRouter);





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
