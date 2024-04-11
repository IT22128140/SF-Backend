import express from 'express';
import { ProductRequest } from '../models/productRequestModel.js';

const router = express.Router();

//Route for save a productRequest
  router.post('/add', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.quantity||
        !request.body.requestedDate
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newProductRequest = {
        productCode:request.body.productCode,
        quantity: request.body.quantity,
        requestedDate: request.body.requestedDate,
      };
  
      const productRequest = await ProductRequest.create(newProductRequest);
  
      return response.status(201).send(productRequest);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view productRequest
  router.get('/', async (request, response) =>{
    try{
      const productRequests = await ProductRequest.find({});
  
      return response.status(200).json(productRequests);
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view productRequest by id
  router.get('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const productRequest = await ProductRequest.findById(id);
  
      return response.status(200).json(productRequest);
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for update productRequest by id
  router.put('/:id', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.quantity||
        !request.body.requestedDate
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
  
      const { id } = request.params;
      const result = await ProductRequest.findByIdAndUpdate(id);
  
      if (!result){
        return response.status(404).json({message: "Not found"});
      }
  
      return response.status(200).send({message: "Updated Successfully"});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
  
    }
  });
  
  //Rought for delete a productRequest
  router.delete('/', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const result = await ProductRequest.findByIdAndDelete(id);
  
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