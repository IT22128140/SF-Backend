import express, { request, response } from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose, { pluralize } from "mongoose";
import { Repair } from "./models/repairModel.js";
import { Machine } from "./models/machinesModes.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});


//Route for save a new Repair
app.post('/repairs', async(request, response) => {

  try {
    if(
      !request.body.RepairDescription ||
      !request.body.RequestedDate ||
      !request.body.RequestedTime ||
      !request.body.UrgencyLevel ||
      !request.body.Status ||
      !request.body.CompletedDate
    ){
      return response.status(404).send({
        message: 'Send all required fields of the table',
      });
    }
    const newRepair = {
      RepairDescription: request.body.RepairDescription,
      RequestedDate: request.body.RequestedDate,
      RequestedTime: request.body.RequestedTime,
      UrgencyLevel: request.body.UrgencyLevel,
      Status: request.body.Status,
      CompletedDate: request.body.CompletedDate,
    };

    const repair = await Repair.create(newRepair);

    return response.status(201).send(repair)
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

//Route for Get All Repairs from database
app.get('/repairs', async(request, response) => {
  try {
    const repairs = await Repair.find({});
    
    return response.status(200).json({
      count: repairs.length,
      data: repairs
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});


//Route for Get One Repair from database by id
app.get('/repairs/:id', async(request, response) => {
  try {
    const { id } = request.params;

    const repair = await Repair.findById(id);

    return response.status(200).json(repair);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// Route for update a Repair
app.put('/repairs/:id', async (request, response) => {
  try {
    if(
      !request.body.RepairDescription ||
      !request.body.RequestedDate ||
      !request.body.RequestedTime ||
      !request.body.UrgencyLevel ||
      !request.body.Status ||
      !request.body.CompletedDate
    ) {
      return response.status(400).send({
        message: 'Send all required fields:',
      });
    }

    const { id } = request.params;

    const result = await Repair.findByIdAndUpdate(id, request.body);

    if(!result) {
      return response.status(404).json({ message: 'Repair nor found'});
    }

    return response.status(200).send({ message: 'Repair updated successfully'});

    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});


//Route for delete a repair
app.delete('/repairs/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Repair.findByIdAndDelete(id);

    if(!result){
      return response.status(404).json({ message: 'Repair not found'});
    }

    return response.status(200).send({ message: 'Repair deleted successfully'});
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});




//Route for save a new Machine
app.post('/machines', async(request, response) => {

  try {
    if(
      !request.body.MachineName ||
      !request.body.PurchasedDate ||
      !request.body.Condition ||
      !request.body.Cost ||
      !request.body.Quantity ||
      !request.body.Manufacturer ||
      !request.body.Category
    ){
      return response.status(404).send({
        message: 'Send all required fields of the table',
      });
    }
    const newMachine = {
      MachineName: request.body.MachineName,
      PurchasedDate: request.body.PurchasedDate,
      Condition: request.body.Condition,
      Cost: request.body.Cost,
      Quantity: request.body.Quantity,
      Manufacturer: request.body.Manufacturer,
      Category: request.body.Category,
    };

    const machine = await Machine.create(newMachine);

    return response.status(201).send(machine)
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

//Route for Get All Machines from database
app.get('/machines', async(request, response) => {
  try {
    const machines = await Machine.find({});
    
    return response.status(200).json({
      count: machines.length,
      data: machines
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});


//Route for Get One Machine from database by id
app.get('/machines/:id', async(request, response) => {
  try {
    const { id } = request.params;

    const machine = await Machine.findById(id);

    return response.status(200).json(machine);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

// Route for update a Machine
app.put('/machines/:id', async (request, response) => {
  try {
    if(
      !request.body.MachineName ||
      !request.body.PurchasedDate ||
      !request.body.Condition ||
      !request.body.Cost ||
      !request.body.Quantity ||
      !request.body.Manufacturer ||
      !request.body.Category
    ) {
      return response.status(400).send({
        message: 'Send all required fields:',
      });
    }

    const { id } = request.params;

    const result = await Machine.findByIdAndUpdate(id, request.body);

    if(!result) {
      return response.status(404).json({ message: 'Machine nor found'});
    }

    return response.status(200).send({ message: 'Machine updated successfully'});

    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});


//Route for delete a machine
app.delete('/machines/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Machine.findByIdAndDelete(id);

    if(!result){
      return response.status(404).json({ message: 'Machine not found'});
    }

    return response.status(200).send({ message: 'Machine deleted successfully'});
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
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
