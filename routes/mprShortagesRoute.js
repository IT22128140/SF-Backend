import express from "express";
import { PartShortage } from "../models/MPRShortagesModel.js";

const router = express.Router();

//Route for getting Pending repairs
router.get('/pending', async (request, response) => {
  try {
    
    const pendingShortages = await PartShortage.find({ Status: "Pending" });

    return response.status(200).json({
      count: pendingShortages.length,
      data: pendingShortages
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


//Route for getting Accepted repairs
router.get('/accepted', async (request, response) => {
  try {
    
    const acceptedShortages = await PartShortage.find({ Status: "Accepted" });

    return response.status(200).json({
      count: acceptedShortages.length,
      data: acceptedShortages
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


//Route for save a new Shoetage Request
router.post('/', async(request, response) => {

    try {
      if(
        !request.body.RequestID ||
        !request.body.Requested||
        !request.body.PartName ||
        !request.body.Description ||
        !request.body.Quantity ||
        !request.body.Condition ||
        !request.body.NeededBeforeDate||
        !request.body.Status   
    ){
        return response.status(404).send({
          message: 'Send all required fields of the table',
        });
      }
      const newShortage = {
        RequestID: request.body.RequestID,
        Requested: request.body.Requested,
        PartName: request.body.PartName,
        Description: request.body.Description,
        Quantity: request.body.Quantity,
        Condition: request.body.Condition,
        NeededBeforeDate: request.body.NeededBeforeDate,
        Status: request.body.Status,
      };
  
      const shortage = await PartShortage.create(newShortage);
  
      return response.status(201).send(shortage)
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for Get All Machine Parts Shortages from database
  router.get('/', async(request, response) => {
    try {
      const shortages = await PartShortage.find({});
      
      return response.status(200).json({
        count: shortages.length,
        data: shortages
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  
  //Route for Get One Machine Part Shortage Request from database by id
  router.get('/:id', async(request, response) => {
    try {
      const { id } = request.params;
  
      const shortage = await PartShortage.findById(id);
  
      return response.status(200).json(shortage);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  // Route for update a Machine Part Shortage Request
  router.put('/:id', async (request, response) => {
    try {
      if(
        !request.body.RequestID ||
        !request.body.Requested||
        !request.body.PartName ||
        !request.body.Description ||
        !request.body.Quantity ||
        !request.body.Condition ||
        !request.body.NeededBeforeDate ||
        !request.body.Status
      ) {
        return response.status(400).send({
          message: 'Send all required fields:',
        });
      }
  
      const { id } = request.params;
  
      const result = await PartShortage.findByIdAndUpdate(id, request.body);
  
      if(!result) {
        return response.status(404).json({ message: 'Shortage request not found'});
      }
  
      return response.status(200).send({ message: 'Shortage request updated successfully'});
  
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });
  
  
  //Route for delete a machine part shortage request
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await PartShortage.findByIdAndDelete(id);
  
      if(!result){
        return response.status(404).json({ message: 'Machine Part Shortage Request not found'});
      }
  
      return response.status(200).send({ message: 'Machine Part Shortage Request deleted successfully'});
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });

  export default router; 