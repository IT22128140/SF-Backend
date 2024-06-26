import express, { request, response } from "express";
import { Repair } from "../models/repairModel.js";
import { Employee } from "../models/employeeModel.js";

const router = express.Router();

//Route for get RepairWorkers
router.get('/rworkers', async (request, response) => {
  try {

    const repairWorkers = await Employee.find({occupation: "RepairWorker" })
                                        .select('employeeID firstName lastName occupation contactNo email');

    return response.status(200).json({
      count: repairWorkers.length,
      data: repairWorkers
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

  // Route to retrieve repair details within a date range
  router.get('/range', async (req, res) => {
    try {
     
      const { startDate, endDate } = req.query;

      const repairs = await Repair.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
  
      // Return the data
      res.status(200).json(repairs);
    } catch (error) {
      console.error('Error retrieving repair details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

//Route for save a new Repair
router.post('/', async(request, response) => {

    try {
      if(
        !request.body.RepairID ||
        !request.body.RepairDescription ||
        !request.body.RequestedTime ||
        !request.body.UrgencyLevel ||
        !request.body.Status ||
        !request.body.Workers||
        !request.body.CompletedDate
      ){
        return response.status(404).send({
          message: 'Send all required fields of the repairs table',
        });
      }

    if (!Array.isArray(request.body.Workers)) {
      return response.status(400).send({
        message: 'Workers must be an array of objects',
      });
    }

    // Validate repair workers
    for (const worker of request.body.Workers) {
      if (!worker.employeeID || !worker.firstName || !worker.lastName) {
        return response.status(400).send({
          message: 'Each worker must have an employeeID and firstName',
        });
      }
    }

      const newRepair = {
        RepairID: request.body.RepairID,
        RepairDescription: request.body.RepairDescription,
        RequestedTime: request.body.RequestedTime,
        UrgencyLevel: request.body.UrgencyLevel,
        Status: request.body.Status,
        Workers: request.body.Workers,
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
        !request.body.RequestedTime ||
        !request.body.UrgencyLevel ||
        !request.body.Status ||
        !request.body.Workers||
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


  //search repair by id
  router.search('/:key', async(request, response) =>{
    console.log(request.params.key);
    let data = await Repair.find(
      {
        "$or": [
          {RepairID: {$regex: request.params.key}}
        ]
      }
    );
    response.send(data);
  });


  export default router;