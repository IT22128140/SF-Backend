import express, { request } from "express";                        // Importing express
import mongoose from "mongoose";                     // Importing mongoose for MongoDB interaction
import { PORT, MONGO_URI } from "./config.js";      // Importing PORT and MONGO_URI from configuration
import cors from "cors";
//enter your imports under your name. don't add or delete empty spaces
//Sageevan
import productRequestRoute from "./routes/productRequestRoute.js";//sageevanRoute 1/4
import productReviewRoute from "./routes/productReviewRoute.js";//sageevanRoute 2/4
import rejectedProductRoute from "./routes/rejectedProductRoute.js";//sageevanRoute 3/4
import releaseProductRoute from "./routes/releaseProductRoute.js";//sageevanRoute 4/4







//Varagan
import FeedbackFormRoutes from "./routes/FeedbackFormRoutes.js";
import FeedbackManageRoutes from "./routes/FeedbackManageRoutes.js";
import LoginCusRoutes from "./routes/LoginCusRoutes.js";
import LoginEmpRoutes from "./routes/LoginEmpRoutes.js";
import RegisCusRoutes from "./routes/RegisCusRoutes.js";
import RegisEmpRoutes from "./routes/RegisEmpRoutes.js";
import ProfileCusRoutes from "./routes/ProfileCusRoutes.js";
import ProfileEmpRoutes from "./routes/ProfileEmpRoutes.js";
import EditProfileCusRoutes from "./routes/EditProfileCusRoutes.js";
import EditProfileEmpRoutes from "./routes/EditProfileEmpRoutes.js";









//Hiranya
import repairsRoute from './routes/repairsRoute.js';
import machinesRoute from './routes/machinesRoute.js';
import mprShortagesRoute from './routes/mprShortagesRoute.js';
import MaintenanceRoute from './routes/MaintenanceRoute.js';






//Ridmi
import rmRequestRoute from './routes/rmRequestRoute.js';
import rmDistributeRoute from './routes/rmDistributeRoute.js';
import empPerformanceRoute from './routes/empPerformanceRoute.js';
import garmentProductRoute from './routes/garmentProductRoute.js';







//Isuru
import SupplierDetailsroutes from "./routes/SupplierDetailsroutes.js";
import RMStockRoutes from "./routes/RMStockRoutes.js";
import MachinePartRoutes from "./routes/MachinePartRoutes.js";
import RequestFillingRoutes from "./routes/RequestFillingRoutes.js"
import suppRawsRoute from "./routes/suppRawsRoute.js"









//Gihan
import salaryRouter from "./routes/salaryemp.js";
import paymentRouter from "./routes/paymentcus.js";
import editsalary from "./routes/editsalary.js"
import chequeimage from "./routes/chequeimage.js";









//Sandithi
import employeeRoute from "./routes/employeeRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import occupationRoute from "./routes/occupationRoute.js";
import resignRoute from "./routes/resignRoute.js";
import employeeStatusRoute from "./routes/employeeStatusRoute.js";




//Maneth
import itemsRoute from "./routes/itemsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import deliveryRoute from "./routes/deliveryDetailsRoute.js";
import orderRoute from "./routes/orderRoute.js";








//connection
const app = express();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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
app.use("/EditProfileCus", EditProfileCusRoutes);
app.use("/LoginEmp", LoginEmpRoutes);
app.use("/RegisEmp", RegisEmpRoutes);
app.use("/ProfileEmp", ProfileEmpRoutes);
app.use("/EditProfileEmp", EditProfileEmpRoutes);








//Sageevan
app.use('/qualityControl/productRequest',productRequestRoute);
app.use('/qualityControl/productReview',productReviewRoute);
app.use('/qualityControl/releaseProduct',releaseProductRoute);
app.use('/qualityControl/rejectedProduct',rejectedProductRoute);






//Hiranya
app.use('/repairs', repairsRoute);
app.use('/machines', machinesRoute);
app.use('/mpshortages', mprShortagesRoute);
app.use('/maintenance', MaintenanceRoute);






//Ridmi
app.use('/rmRequests', rmRequestRoute);
app.use('/rmDistributes', rmDistributeRoute);
app.use('/empPerformances', empPerformanceRoute);
app.use('/garmentProduct',garmentProductRoute);








//Isuru
app.use('/supdetails', SupplierDetailsroutes);
app.use('/RMstock', RMStockRoutes);
app.use('/mpstock', MachinePartRoutes);
app.use('/ReqFF', RequestFillingRoutes);
app.use('/suppRM',suppRawsRoute);










//Gihan029
app.use('/salary', salaryRouter);
app.use('/payment', paymentRouter);
app.use('/editsalary', editsalary);
app.use('/uploads',chequeimage);












//Sandithi
app.use("/employee", employeeRoute);
app.use("/attendance", attendanceRoute);
app.use("/occupation", occupationRoute);
app.use("/resign", resignRoute);
app.use("/employeeStatus", employeeStatusRoute);




//Maneth
app.use("/items", itemsRoute);
app.use("/cart", cartRoute);
app.use("/deliveryDetails", deliveryRoute);
app.use("/order", orderRoute);












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
