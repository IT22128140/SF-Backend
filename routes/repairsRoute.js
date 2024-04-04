import express from "express";
import { Repair } from "../models/repairModel.js";

const router = express.Router();

//Route for save a new Repair
router.post('/', async(request, response) => {

    try {
      if(
        !request.body.RepairID ||
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
        RepairID: request.body.RepairID,
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
  router.get('/', async(request, response) => {
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
  router.get('/:id', async(request, response) => {
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
  router.put('/:id', async (request, response) => {
    try {
      if(
        !request.body.RepairID ||
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
  router.delete('/:id', async (request, response) => {
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

  export default router;