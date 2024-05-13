import express from 'express';
import { ProductReview } from '../models/productReviewModel.js';

const router = express.Router();

//Route for save a productReview
router.post('/', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.fabricType||
        !request.body.color||
        !request.body.stitchingType||
        !request.body.quantity||
        !request.body.inspectionResult
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newProductReview = {
        productCode:request.body.productCode,
        fabricType:request.body.fabricType,
        color:request.body.color,
        stitchingType:request.body.stitchingType,
        quantity: request.body.quantity,
        inspectionResult: request.body.inspectionResult,
        defects: request.body.defects|| null,
      };
  
      const productReview = await ProductReview.create(newProductReview);
  
      return response.status(201).send(productReview);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for view productReview
  router.get('/', async (request, response) =>{
    try{
      const productReviews = await ProductReview.find({});
  
      return response.status(200).json({
        count: productReviews.length,
        data: productReviews
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  //Route for sort Approved productReview
  router.get('/release', async (request, response) =>{
    try{
      const productReviews = await ProductReview.find({
        inspectionResult: "Approved" 
      // , action: "pending"
    });
  
      return response.status(200).json({
        count: productReviews.length,
        data: productReviews
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  //Route for sort Reject productReview
  router.get('/reject', async (request, response) =>{
    try{
      const productReviews = await ProductReview.find({
        inspectionResult: "Reject" 
      // , action: "pending"
    });
  
      return response.status(200).json({
        count: productReviews.length,
        data: productReviews
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Route for get one productReview from database by id
  router.get('/:id',async(request,response) => {
    try{
      const { id } = request.params;
  
      const productReview = await ProductReview.findById(id);
  
      return response.status(200).json(productReview);
  
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //Rought for delete a ProductReview
  router.delete('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const result = await ProductReview.findByIdAndDelete(id);
  
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