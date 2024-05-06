import express from 'express';
import { Salary } from '../models/salary.js';
const router = express.Router();


//route for save a new salary

router.post('/', async (request, response) => {
    try {
      if (
        !request.body.lastName ||
        !request.body.employeeID ||
        // !request.body.time ||
        !request.body.firstName ||
        !request.body.contactNo ||
        !request.body.email ||
        !request.body.basicSalary ||
        !request.body.attendance ||
        !request.body.overtime ||
        !request.body.bonus ||
        !request.body.totalAmount
        // !request.body.notice ||
        // !request.body.cheque1 ||
        // !request.body.cheque2 ||
        // !request.body.profile
      ) {
        return response.status(500).send({
          message: "send all required fields of the table",});
      }
      const newSalary ={
        lastName: request.body.lastName,
        employeeID: request.body.employeeID,
        // time: request.body.time,
        firstName: request.body.firstName,
        contactNo: request.body.contactNo,
        email: request.body.email,
        basicSalary: request.body.basicSalary,
        attendance: request.body.attendance,
        overtime: request.body.overtime,
        bonus: request.body.bonus,
        totalAmount: request.body.totalAmount,
        // notice: request.body.notice,
        // cheques: request.body.cheque1,
        // cheque2: request.body.cheque2,
        // profile: request.body.profile,
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
            
            
            !request.body.attendance ||
            !request.body.overtime ||
            !request.body.totalAmount ||
            !request.body.bonus
            
          ) {
            return response.status(404).send({
              message: "send all required fields of the table",
            });
          }
          const { id } = request.params;
          
          const data = {
            
            attendance: request.body.attendance,
            overtime: request.body.overtime,
            totalAmount: request.body.totalAmount,
            bonus: request.body.bonus
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
  });

  // Route to retrieve repair details within a date range
  router.get('/range', async (req, res) => {
    try {
      // Parse start and end dates from request query parameters
      const { startDate, endDate } = req.query;
  
      // Query the database for repair records within the specified date range
      const salary = await Salary.find({
        time: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });
  
      // Return the retrieved repair details as a response
      res.status(200).json(salary);
    } catch (error) {
      console.error('Error retrieving repair details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
    export default router;