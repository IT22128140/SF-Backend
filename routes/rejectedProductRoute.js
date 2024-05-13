import express from 'express';
import { RejectedProduct } from '../models/rejectedProductModel.js';

const router = express.Router();

//Route for save a rejectedProduct
router.post('/', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.fabricType||
        !request.body.color||
        !request.body.stitchingType||
        !request.body.quantity||
        !request.body.defects
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newRejectedProduct = {
        productCode:request.body.productCode,
        fabricType:request.body.fabricType,
        color:request.body.color,
        stitchingType:request.body.stitchingType,
        quantity: request.body.quantity,
        defects: request.body.defects,
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

    //Rought for delete a RejectedProduct
  router.delete('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const result = await RejectedProduct.findByIdAndDelete(id);
  
      if (!result){
        return response.status(404).json({message: "Not found"});
      }
  
      return response.status(200).send({message: "Deleted Successfully"});
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
export default router;