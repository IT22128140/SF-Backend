import express from 'express';
import {MP} from '../models/machinePart.js';


const router = express.Router();

router.post('/', async (request,response) => {
    try{
      if(
       
        !request.body.partName||
        !request.body.purchasedDate ||
        !request.body.condition ||
        !request.body.costPerUnit ||
        !request.body.quantity ||
        !request.body.manufacturer 
      ){
        return response.status(400).send({
          message: 'send all required fields',
        });
      }
  
      const MPS ={
        
        partName: request.body.partName,
        purchasedDate: request.body.purchasedDate,
        condition: request.body.condition,
        costPerUnit: request.body.costPerUnit,
        quantity: request.body.quantity,
        manufacturer: request.body.manufacturer
      };
       
       const MchnP = await MP.create(RMS); 
        return response.status(201).send(MchnP);
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  
  router.get('/', async (request, response) => {
    try {
      const mps = await MP.find({});                          
      return response.status(206).send(mps);                   
    } catch (error) {
      console.log(error.message);                                
      response.status(501).send({ message: error.message });     
    }
  });
  
  
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;                             
      const mps = await MP.findById(id);                       
      return response.status(206).send(Rmstk);                    
    } catch (error) {
      console.log(error.message);                                 // Logging any errors
      response.status(500).send({ message: error.message });     // Sending an error response
    }
  });
  


router.put('/:id', async (request, response) => {
    try {
      // Checking if all required fields are provided in the request body
      if (
        !request.body.partName||
        !request.body.purchasedDate ||
        !request.body.condition ||
        !request.body.costPerUnit ||
        !request.body.quantity ||
        !request.body.manufacturer 
      ) {
        return response.status(400).send({ message: 'Send all required fields' });
      }
  
      const { id } = request.params;                                                    // Extracting the ID parameter from the request
      const results = await MP.findByIdAndUpdate(id, request.body);                    
      if (!results) {
        return response.status(404).json({ message: 'MP not found' });           
      }
      return response.status(200).send({ message: "MP updated successfully" });    // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                            // Sending an error response
    }
  });


  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;                                               
      const MPDlt = await MP.findByIdAndDelete(id);                                  
      if (!MPDlt) {
        return response.status(404).json({ message: 'MP not found' });            // Sending a 404 response if the supplier is not found
      }
      return response.status(200).send({ message: "MP removed successfully" });   // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                           // Sending an error response
    }
  });
  
  export default router;