import express from 'express';
import { GarmentProduct } from '../models/garmentProductModel.js';

const router = express.Router();

//Route for save a garmentProduct
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
      const newGarmentProduct = {
        productCode:request.body.productCode,
        fabricType:request.body.fabricType,
        color:request.body.color,
        stitchingType:request.body.stitchingType,
        quantity: request.body.quantity,
      };
  
      const garmentProduct = await GarmentProduct.create(newGarmentProduct);
  
      return response.status(201).send(garmentProduct);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view all garmentProduct
  router.get('/', async (request, response) =>{
    try{
      const garmentProducts = await GarmentProduct.find({});
  
      return response.status(200).json({
        count: garmentProducts.length,
        data: garmentProducts
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  
  //Route for get one garmentProduct from database by id
  router.get('/:id',async(request,response) => {
  try{
    const { id } = request.params;

    const garmentProduct = await GarmentProduct.findById(id);

    return response.status(200).json(garmentProduct);

  }catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});
  
  //Route for update garmentProduct by id
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
      const result = await GarmentProduct.findByIdAndUpdate(id, request.body);
  
      if (!result){
        return response.status(404).json({message: "Not found"});
      }
  
      return response.status(200).send({message: "Updated Successfully"});
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
  
    }
  });
  
  //Rought for delete a garmentProduct
  router.delete('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const result = await GarmentProduct.findByIdAndDelete(id);
  
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