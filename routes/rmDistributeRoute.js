import express from 'express';
import { rmDistribute } from '../models/rmDistributeModel.js';

const router = express.Router();

//Route for save a new rmdistribute
router.post('/', async (request,response) => {
    try{
      if(   //validations to confirm all the required fields are filled
        !request.body.DistributeID ||
        !request.body.Date||
        !request.body.LineNumber ||
        !request.body.PositionNumber ||
        !request.body.Distributed||
        !request.body.Shortage
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
      const newrmDistribute = {
        DistributeID : request.body.DistributeID,
        Date : request.body.Date,
        LineNumber : request.body.LineNumber,
        PositionNumber : request.body.PositionNumber,
        Distributed : request.body.Distributed,
        Shortage : request.body.Shortage
      };
  
      const rmdistribute = await rmDistribute.create(newrmDistribute);
  
      return response.status(201).send(rmdistribute);
      
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get all the rmdistributes from database
router.get('/',async(request,response) => {
    try{
      const rmdistributes = await rmDistribute.find({});
  
      return response.status(200).json({
        count: rmdistributes.length,
        data: rmdistributes
      });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get one rmdistribute from database by id
router.get('/:id',async(request,response) => {
    try{
      const { id } = request.params;
  
      const rmdistribute = await rmDistribute.findById(id);
  
      return response.status(200).json(rmdistribute);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for update a rmdistribute
router.put('/:id', async (request, response) =>{
    try{
      if(
        !request.body.DistributeID ||
        !request.body.Date||
        !request.body.LineNumber ||
        !request.body.PositionNumber ||
        !request.body.Distributed||
        !request.body.Shortage
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
  
      const { id } = request.params;
  
      const result = await rmDistribute.findByIdAndUpdate(id, request.body);
  
      if(!result) {
        return response.status(404).json({ message: 'rmDistribute not found' });
      }
      return response.status(200).send({message: 'rmDistribute updated successfully' });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for deleting a rmdistribute
router.delete('/:id', async (request,response) => {
    try{
      const { id } = request.params;
  
      const result = await rmDistribute.findByIdAndDelete( id );
  
      if(!result) {
        return response.status(404).json({ message : 'rmDistribute not found'});
      }
      return response.status(200).send({ message : 'rmDistribute deleted successfully'});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({ message: error.message })
    }
  });
  
export default router;