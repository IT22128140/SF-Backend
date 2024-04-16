import express from 'express';
import { ReleaseProduct } from '../models/releaseProductModel.js';

const router = express.Router();

//Route for save a releaseProduct
router.post('/', async (request, response) =>{
    try{
      if(
        !request.body.release_ID||
        !request.body.productCode||
        !request.body.releaseDate
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newReleaseProduct = {
        release_ID:request.body.release_ID,      
        productCode:request.body.productCode,
        //customerID: request.body.customerID,
        releaseDate: request.body.releaseDate,
      };
  
      const releaseProduct = await ReleaseProduct.create(newReleaseProduct);
  
      return response.status(201).send(releaseProduct);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view releaseProduct
  router.get('/', async (request, response) =>{
    try{
      const releaseProducts = await ReleaseProduct.find({});
  
      return response.status(200).json({
        count: releaseProducts.length,
        data: releaseProducts
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view releaseProduct by id
  router.get('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const releaseProduct = await ReleaseProduct.findById(id);
  
      return response.status(200).json({
        count: releaseProduct.length,
        data: releaseProduct
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for update releaseProduct by id
  router.put('/:id', async (request, response) =>{
    try{
      if(
        !request.body.release_ID||
        !request.body.productCode||
        !request.body.releaseDate
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
  
      const { id } = request.params;
      const result = await ReleaseProduct.findByIdAndUpdate(id, request.body);
  
      if (!result){
        return response.status(404).json({message: "Not found"});
      }
  
      return response.status(200).send({message: "Updated Successfully"});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
  
    }
  });
  
  //Rought for delete a releaseProduct
  router.delete('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const result = await ReleaseProduct.findByIdAndDelete(id);
  
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