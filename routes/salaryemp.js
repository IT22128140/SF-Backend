import express from 'express';
import { Salary } from '../models/salary.js';
const router = express.Router();


//route for save a new salary

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.time ||
        !request.body.fullName ||
        !request.body.basicSalary ||
        !request.body.attendance ||
        !request.body.overtime ||
        !request.body.bonus ||
        !request.body.totalAmount ||
        !request.body.notice ||
        !request.body.cheques ||
        !request.body.profile
      ) {
        return response.status(404).send({
          message: "send all required fields of the table",});
      }
      const newSalary ={
        name: request.body.name,
        time: request.body.time,
        fullName: request.body.fullName,
        basicSalary: request.body.basicSalary,
        attendance: request.body.attendance,
        overtime: request.body.overtime,
        bonus: request.body.bonus,
        totalAmount: request.body.totalAmount,
        notice: request.body.notice,
        cheques: request.body.cheques,
        profile: request.body.profile,
      };
      const salary = await Salary.create(newSalary);
      return response.status(201).send(salary);
      
    }catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });
  
  //route for get all salary
  
  router.get('/', async (request, response) => {
    try {
      const salary = await Salary.find({});
      return response.status(200).json(salary);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
    });
  
    //route for get a single salary
  
    router.get('/:id', async (request, response) => {
      try {
  
        const { id } = request.params;
  
        const salaryone = await Salary.findById(id);
        return response.status(200).json(salaryone);
      } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
      });
  
      //route for update a single salary
  
      router.put('/:id', async (request, response) => {
        try {
          if(
            
            !request.body.basicSalary ||
            !request.body.attendance ||
            !request.body.overtime ||
            !request.body.bonus ||
            !request.body.totalAmount 
            
          ) {
            return response.status(404).send({
              message: "send all required fields of the table",
            });
          }
          const { id } = request.params;
          const result = await Salary.findByIdAndUpdate(id,request.body);
          if(!result) {
            return response.status(404).send({message: "salary not found"});
          }
          return response.status(200).send({message: "salary updated successfully"});
        
        } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
      });
  //route for delete a single salary
  
  router.delete('/:id', async (request, response) => {
    try{
       
      const { id } = request.params;
      const result = await Salary.findByIdAndDelete(id,request.body);
      if(!result) {
        return response.status(404).send({message: "salary not found"});
      }
      return response.status(200).send({message: "salary Delete successfully"});
    
  
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
      }
      }); 

  router.search('/:key', async (request, response) => {
    console.log(request.params.key);
    let data = await Salary.find(
      {
        "$or": [
          {name: { '$regex': request.params.key  }}
        ]
      }
    );
    response.send(data);
  })
  
    export default router;