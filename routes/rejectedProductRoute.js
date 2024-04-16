import express from 'express';
import { RejectedProduct } from '../models/rejectedProductModel.js';

const router = express.Router();

//Route for save a rejectedProduct
router.post('/add', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.rejectDate||
        !request.body.defect
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newRejectedProduct = {
        productCode:request.body.productCode,
        rejectDate: request.body.rejectDate,
        defect: request.body.defect,
        customer_ID: request.body.customer_ID|| null,
      };
  
      const rejectedProduct = await RejectedProduct.create(newRejectedProduct);
  
      return response.status(201).send(rejectedProduct);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
    //Route for view rejectedProduct
    router.get('/', async (request, response) =>{
      try{
        const rejectedProducts = await RejectedProduct.find({});
    
        return response.status(200).json({
          count: rejectedProducts.length,
          data: rejectedProducts
        });
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });
  
    //Route for view rejectedProduct by id
    router.get('/:id', async (request, response) =>{
      try{
  
        const { id } = request.params;
        const rejectedProduct = await RejectedProduct.findById(id);
    
        return response.status(200).json({
          count: rejectedProduct.length,
          data: rejectedProduct
        });
      }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });
  
export default router;