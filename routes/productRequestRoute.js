import express from 'express';
import { ProductRequest } from '../models/productRequestModel.js';

const router = express.Router();

//Route for save a productRequest
  router.post('/', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.fabricType||
        !request.body.color||
        !request.body.stitchingType||
        !request.body.quantity
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newProductRequest = {
        productCode:request.body.productCode,
        fabricType:request.body.fabricType,
        color:request.body.color,
        stitchingType:request.body.stitchingType,
        quantity: request.body.quantity,
      };
  
      const productRequest = await ProductRequest.create(newProductRequest);
  
      return response.status(201).send(productRequest);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view all productRequest
  router.get('/', async (request, response) =>{
    try{
      const productRequests = await ProductRequest.find({acceptStatus: 'pending'});
  
      return response.status(200).json({
        count: productRequests.length,
        data: productRequests
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

    //Route for view pending Review 
    router.get('/pendingReview', async (request, response) =>{
      try{
        const productRequests = await ProductRequest.find({acceptStatus: 'Accept'});
    
        return response.status(200).json({
          count: productRequests.length,
          data: productRequests
        });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
    });
  
  //Route for get one productRequest from database by id
  router.get('/:id',async(request,response) => {
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
        !request.body.fabricType||
        !request.body.color||
        !request.body.stitchingType||
        !request.body.quantity
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
  
      const { id } = request.params;
      const result = await ProductRequest.findByIdAndUpdate(id, request.body);
  
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
  router.delete('/:id', async (request, response) =>{
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

  //Route for Accept Final Product by id
  router.put('/:id/updateAcceptStatus', async (request, response) =>{
  try{
    const { id } = request.params;
    
    const productRequest = await ProductRequest.findById(id, request.body);
    if (!productRequest) {
      return response.status(404).json({message: "Product Request not found"});
    }

    productRequest.acceptStatus = "Accept";

    await productRequest.save();

    return response.status(200).json({message: "Accepted successfully"});

  } catch(error){
    console.log(error.message);
    response.status(500).send({message: "Internal server error"});
  }
});




  export default router;