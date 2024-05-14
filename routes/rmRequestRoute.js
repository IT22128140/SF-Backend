import express from 'express';
import { rmRequest } from '../models/rmRequestModel.js';

const router = express.Router(); 

//Route to get completed rmrequests
router.get('/completed', async(request,response) => {
  try{
    const completedrmrequests = await rmRequest.find({Status : "Completed"});

    return response.status(200).json({
      count: completedrmrequests.length,
      data: completedrmrequests
    });

  } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});

//Route to get pending rmrequests
router.get('/pending', async(request,response) => {
  try{
    const pendingrmrequests = await rmRequest.find({Status : "Pending"});

    return response.status(200).json({
      count: pendingrmrequests.length,
      data: pendingrmrequests
    });

  } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});

//Route for save a new rmrequest
router.post('/', async (request,response) => {
    try{
      if(   //validations to confirm all the required fields are filled
        !request.body.RequestID ||
        !request.body.FabricType_Colour_Amount ||
        !request.body.ButtonType_Colour_Amount ||
        !request.body.ThreadType_Colour_Amount ||
        !request.body.Other_Materials ||
        !request.body.Status
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
      const newrmRequest = {
        RequestID : request.body.RequestID,
        FabricType_Colour_Amount : request.body.FabricType_Colour_Amount,
        ButtonType_Colour_Amount : request.body.ButtonType_Colour_Amount,
        ThreadType_Colour_Amount : request.body.ThreadType_Colour_Amount,
        Other_Materials : request.body.Other_Materials,
        Status : request.body.Status
      };
  
      const rmrequest = await rmRequest.create(newrmRequest);
  
      return response.status(201).send(rmrequest);
      
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get all the rmrequests from database
router.get('/',async(request,response) => {
    try{
      const rmrequests = await rmRequest.find({});
  
      return response.status(200).json({
        count: rmrequests.length,
        data: rmrequests
      });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for get one rmrequest from database by id
router.get('/:id',async(request,response) => {
    try{
      const { id } = request.params;
  
      const rmrequest = await rmRequest.findById(id);
  
      return response.status(200).json(rmrequest);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for update a rmrequest
router.put('/:id', async (request, response) =>{
    try{
      if(
        !request.body.RequestID ||
        !request.body.FabricType_Colour_Amount ||
        !request.body.ButtonType_Colour_Amount ||
        !request.body.ThreadType_Colour_Amount ||
        !request.body.Other_Materials ||
        !request.body.Status
      ){
        return response.status(400).send({
          message: 'Send all the required fields',
        });
      }
  
      const { id } = request.params;
  
      const result = await rmRequest.findByIdAndUpdate(id, request.body);
  
      if(!result) {
        return response.status(404).json({ message: 'rmRequest not found' });
      }
      return response.status(200).send({message: 'rmRequest updated successfully' });
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
//Route for deleting a rmRequest
router.delete('/:id', async (request,response) => {
    try{
      const { id } = request.params;
  
      const result = await rmRequest.findByIdAndDelete( id );
  
      if(!result) {
        return response.status(404).json({ message : 'rmRequest not found'});
      }
      return response.status(200).send({ message : 'rmRequest deleted successfully'});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({ message: error.message })
    }
  });
  
export default router;