import express from 'express';
import {MP} from '../models/machinePartModel.js';


const router = express.Router();

router.post('/', async (request,response) => {
    try{
      if(
        !request.body.partID ||
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
        partID: request.body.partID,
        partName: request.body.partName,
        purchasedDate: request.body.purchasedDate,
        condition: request.body.condition,
        costPerUnit: request.body.costPerUnit,
        quantity: request.body.quantity,
        manufacturer: request.body.manufacturer
      };
       
       const MchnP = await MP.create(MPS); 
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
      return response.status(206).send(mps);                    
    } catch (error) {
      console.log(error.message);                                 
      response.status(500).send({ message: error.message });     
    }
  });
  

  router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPart = await MP.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPart) {
            return res.status(404).json({ message: 'Machine part not found' });
        }
        return res.status(200).send({ message: 'Machine part updated successfully', updatedPart });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});


  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;                                               
      const MPDlt = await MP.findByIdAndDelete(id);                                  
      if (!MPDlt) {
        return response.status(404).json({ message: 'MP not found' });            
      }
      return response.status(200).send({ message: "MP removed successfully" });   
    } catch (error) {
      console.log(error.message);                                                      
      response.status(500).send({ message: error.message });                           
    }
  });
  
  export default router;