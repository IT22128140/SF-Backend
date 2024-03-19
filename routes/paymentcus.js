import express from 'express';
import { Payment } from '../models/custompay.js';

const router = express.Router();




//route for save a new payment

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.fullName ||
            !request.body.phoneNumber ||
            !request.body.emailAddress ||
            !request.body.bankName ||
            !request.body.branchName
        ){
            return response.status(404).send({
                message: "send all required fields of the table",
            });
        }
        const newPaymentcus = {
            fullName: request.body.fullName,
            phoneNumber: request.body.phoneNumber,
            emailAddress: request.body.emailAddress,
            bankName: request.body.bankName,
            branchName: request.body.branchName,
        };
        const payment = await Payment.create(newPaymentcus);
        return response.status(201).send(payment);
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  export default router;
  