import express from 'express';
import { Salary } from '../models/salary.js';
const router = express.Router();





router.put('/:id', async (request, response) => {
    try {
      if(
        
        
        !request.body.totalAmount
        
      ) {
        return response.status(404).send({
          message: "send all required fields of the table",
        });
      }
      const { id } = request.params;
      
      const data = {
        
        totalAmount: request.body.totalAmount
      }

      const result = await Salary.findByIdAndUpdate(id,data);
      if(!result) {
        return response.status(404).send({message: "salary not found"});
      }
      return response.status(200).send({message: "salary updated successfully"});
    
    } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
  });


  export default router;