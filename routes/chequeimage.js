import express from 'express';
import { Salary } from '../models/salary.js';



const router = express.Router();

router.put('/:id', async (request, response) => {
  try {
    if(
      !request.body.time ||
      !request.body.notice ||
      !request.body.cheque1 ||
      !request.body.cheque2 ||
      !request.body.profile
    ) {
      return response.status(500).send({
        message: "send all required fields of the table",});
    }
    const newSalary ={
      time: request.body.time,
      notice: request.body.notice,
      cheque1: request.body.cheque1,
      cheque2: request.body.cheque2,
      profile: request.body.profile,
    };
    const salary = await Salary.create(newSalary);
    return response.status(201).send(salary);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});

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









  export default router;