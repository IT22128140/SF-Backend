import express from 'express';
import { Payment } from '../models/custompay.js';
import nodemailer from 'nodemailer';
import multer from 'multer';

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
}).single('slip')  



//route for save a new payments

router.post('/', async (request, response) => {
    try {
        if (
            !request.body.fullName ||
            // !request.body.totalpayment ||
            !request.body.phoneNumber ||
            !request.body.emailAddress ||
            !request.body.bankName ||
            !request.body.branchName ||
            !request.body.slip
        ){
            return response.status(404).send({
                message: "send all required fields of the table",
            });
        }
        const newPaymentcus = {
            fullName: request.body.fullName,
            // totalpayment: request.body.totalpayment,
            phoneNumber: request.body.phoneNumber,
            emailAddress: request.body.emailAddress,
            bankName: request.body.bankName,
            branchName: request.body.branchName,
            slip: request.body.slip,
        };
        const payment = await Payment.create(newPaymentcus);
        return response.status(201).send(payment);
    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  });

  router.get('/:id', async (request, response) => {
    try {

      const { id } = request.params;

      const paymentone = await Payment.findById(id);
      return response.status(200).json(paymentone);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'isurupathiranadwg@gmail.com', // Your email address
          pass: 'fmjwrtfapssmrdyi' // Your email password
      }
  });
  
  // Function to send email
  const sendEmail = (email, subject, body) => {
      const mailOptions = {
          from: 'isurupathiranadwg@gmail.com', // Sender address
          to: email,
          subject: subject,
          text: body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
          } else {
              console.log('Email sent:', info.response);
          }
      });
  };
  
  // Example route to trigger email sending
  router.post('/send-email', (req, res) => {
      const { email, subject, body } = req.body;
      sendEmail(email, subject, body);
      res.send('Email sent successfully');
  });

  export default router;
  