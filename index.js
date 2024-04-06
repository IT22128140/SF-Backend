import express from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

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



  app.post('/api/RegisterEmp', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {FirstName,LaststName,emailAddress,phoneNumber,password,password2,EmployeeType} = req.body;
  
    try {
      const userDoc = await User.create({
        FirstName,
        LaststName,
        emailAddress,
        phoneNumber,
        password,
        EmployeeType,
        password2:bcrypt.hashSync(password,password2, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });

  app.post('/api/RegisterCus', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {FirstName,LaststName,emailAddress,phoneNumber,password,password2} = req.body;
  
    try {
      const userDoc = await User.create({
        FirstName,
        LaststName,
        emailAddress,
        phoneNumber,
        password,
        password2:bcrypt.hashSync(password,password2, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });
  
  app.post('/api/LoginCus', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

  app.post('/api/LoginEmp', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });
  
  app.get('/api/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {FirstName,LaststName,emailAddress,phoneNumber} = await User.findById(userData.id);
        res.json({FirstName,LaststName,emailAddress,phoneNumber});
      });
    } else {
      res.json(null);
    }
  });
  
  app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
  });