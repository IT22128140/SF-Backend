import express from 'express';
import { Salary } from '../models/salary.js';
import multer from 'multer';
import path from 'path';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/Images')
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})





router.put('/:id',upload.single('file'), async (request, response) => {
  

    try {
      if(
        
        
        !request.body.cheques 
        
      ) {
        return response.status(404).send({
          message: "send all required fields of the table",
        });
      }
      const { id } = request.params;
      
      const data = {
        
        cheques: request.body.cheques
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