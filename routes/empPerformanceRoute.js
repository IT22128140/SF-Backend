import express from 'express';
import {empPerformance} from '../models/empPerformanceModel.js';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();

//Route for fetch a employee with line worker occupation
router.get('/lineworkers',async(request,response) => {
  try{
    const lineworkers = await Employee.find({occupation: "LineWorker"});

    return response.status(200).json({
      count: lineworkers.length,
      data: lineworkers
    });

  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

//Route for save a new empPerformance
router.post('/', async (request,response) => {
    try{
      if(   //validations to confirm all the required fields are filled
        !request.body.EmployeeID ||
        !request.body.LineNumber ||
        !request.body.PositionNumber ||
        !request.body.StandardMinuteValue||
        !request.body.WorkingHours ||
        !request.body.OtherNotes
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
      const newempPerformance = {
        EmployeeID : request.body.EmployeeID,
        LineNumber : request.body.LineNumber,
        PositionNumber : request.body.PositionNumber,
        StandardMinuteValue : request.body.StandardMinuteValue,
        WorkingHours : request.body.WorkingHours,
        OtherNotes : request.body.OtherNotes,
      };
  
      const empperformance = await empPerformance.create(newempPerformance);
  
      return response.status(201).send(empperformance);
      
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get all the empPerformances from database
router.get('/',async(request,response) => {
    try{
      const empperformances = await empPerformance.find({});
  
      return response.status(200).json({
        count: empperformances.length,
        data: empperformances
      });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get one empPerformance from database by id
router.get('/:id',async(request,response) => {
    try{
      const { id } = request.params;
  
      const empperformance = await empPerformance.findById(id);
  
      return response.status(200).json(empperformance);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for update a empPerformance
router.put('/:id', async (request, response) =>{
    try{
      if(
        !request.body.EmployeeID ||
        !request.body.LineNumber ||
        !request.body.PositionNumber ||
        !request.body.StandardMinuteValue||
        !request.body.WorkingHours ||
        !request.body.OtherNotes
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
  
      const { id } = request.params;
  
      const result = await empPerformance.findByIdAndUpdate(id, request.body);
  
      if(!result) {
        return response.status(404).json({ message: 'empPerformance not found' });
      }
      return response.status(200).send({message: 'empPerformance updated successfully' });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for deleting a empPerformance
router.delete('/:id', async (request,response) => {
    try{
      const { id } = request.params;
  
      const result = await empPerformance.findByIdAndDelete( id );
  
      if(!result) {
        return response.status(404).json({ message : 'empPerformance not found'});
      }
      return response.status(200).send({ message : 'empPerformance deleted successfully'});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({ message: error.message })
    }
  });
  
export default router;