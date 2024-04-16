import express from 'express';
import { ProductReview } from '../models/productReviewModel.js';

const router = express.Router();

//Route for save a productReview
router.post('/', async (request, response) =>{
    try{
      if(
        !request.body.productCode||
        !request.body.inspectionResult||
        !request.body.reviewDate
      ) {
        return response.status(400).send({
          message: 'send all required field',
        });
      }
      const newProductReview = {
        productCode:request.body.productCode,
        inspectionResult: request.body.inspectionResult,
        reviewDate: request.body.reviewDate,
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
  
  //Route for view productReview by id
  router.get('/:id', async (request, response) =>{
    try{
  
      const { id } = request.params;
      const productReview = await ProductReview.findById(id);
  
      return response.status(200).json({
        count: productReview.length,
        data: productReview
      });
    }catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  

export default router;