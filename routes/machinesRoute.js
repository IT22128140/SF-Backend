import express from "express";
import { Machine } from "../models/machinesModes.js";

const router = express.Router();



//Route for save a new Machine
router.post('/', async(request, response) => {

    try {
      if(
        !request.body.MachineID ||
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
        MachineID: request.body.MachineID,
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
  router.get('/', async(request, response) => {
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
  router.get('/:id', async(request, response) => {
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
  router.put('/:id', async (request, response) => {
    try {
      if(
        !request.body.MachineID ||
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
  router.delete('/:id', async (request, response) => {
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

  export default router; 