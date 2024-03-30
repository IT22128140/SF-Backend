import express from 'express';
import {RM} from '../models/RMStock.js';


const router = express.Router();

router.post('/', async (request,response) => {
    try{
      if(
       
        !request.body.materialType||
        !request.body.colorAndDesign ||
        !request.body.quantity
      ){
        return response.status(400).send({
          message: 'send all required fields',
        });
      }
  
      const RMS ={
        
        materialType: request.body.materialType,
        colorAndDesign: request.body.colorAndDesign,
        quantity: request.body.quantity
      };
       
       const RawM = await RM.create(RMS); 
        return response.status(201).send(RawM);
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  
  // Route handler to retrieve all suppliers
  router.get('/', async (request, response) => {
    try {
      const Rmstk = await RM.find({});                            // Finding all suppliers in the database
      return response.status(206).send(Rmstk);                     // Sending the retrieved suppliers as a response
    } catch (error) {
      console.log(error.message);                                 // Logging any errors
      response.status(501).send({ message: error.message });      // Sending an error response
    }
  });
  
  // Route handler to retrieve a specific supplier by ID
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;                              // Extracting the ID parameter from the request
      const Rmstk = await RM.findById(id);                       // Finding the supplier by ID in the database
      return response.status(206).send(Rmstk);                    // Sending the retrieved supplier as a response
    } catch (error) {
      console.log(error.message);                                 // Logging any errors
      response.status(500).send({ message: error.message });     // Sending an error response
    }
  });
  

  // Route handler to update a specific supplier by ID
router.put('/:id', async (request, response) => {
    try {
      // Checking if all required fields are provided in the request body
      if (
        !request.body.materialType||
        !request.body.colorAndDesign ||
        !request.body.quantity
      ) {
        return response.status(400).send({ message: 'Send all required fields' });
      }
  
      const { id } = request.params;                                                    // Extracting the ID parameter from the request
      const results = await RM.findByIdAndUpdate(id, request.body);                     // Updating the supplier document in the database
      if (!results) {
        return response.status(404).json({ message: 'Rm not found' });             // Sending a 404 response if the supplier is not found
      }
      return response.status(200).send({ message: "RM updated successfully" });    // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                            // Sending an error response
    }
  });


  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;                                                  // Extracting the ID parameter from the request
      const RmDlt = await RM.findByIdAndDelete(id);                                    // Deleting the supplier document from the database
      if (!RmDlt) {
        return response.status(404).json({ message: 'RM not found' });            // Sending a 404 response if the supplier is not found
      }
      return response.status(200).send({ message: "RM removed successfully" });   // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                           // Sending an error response
    }
  });
  
  export default router;