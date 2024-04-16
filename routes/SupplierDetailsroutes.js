import express from 'express';
import { Sup} from '../models/SupplierDetailsModel.js';

const router = express.Router();


// Route handler to create a new supplier
router.post('/', async (request, response) => {
    try {
      // Checking if all required fields are provided in the request body
      if (
        !request.body.SRequestID ||
        !request.body.supplierName ||
        !request.body.address ||
        !request.body.contactNumber ||
        !request.body.email ||
        !request.body.supplierType ||
        !request.body.contractExpiary
      ) {
        return response.status(400).send({
          message: 'send all required fields: supplierName, address, contactNumber, email, supplierType, contractExpiary',
        });
      }
  
      // Creating a new supplier document
      const supdtls = {
        SRequestID:    request.body.SRequestID,
        supplierName:    request.body.supplierName,
        address:         request.body.address,
        contactNumber:   request.body.contactNumber,
        email:           request.body.email,
        supplierType:    request.body.supplierType,
        contractExpiary: request.body.contractExpiary
      };
      const suppliers = await Sup.create(supdtls);               // Saving the supplier document to the database
      return response.status(201).send(suppliers);               // Sending a success response
    } catch (error) {
      console.log(error.message);                                // Logging any errors
      response.status(500).send({ message: error.message });     // Sending an error response
    }
  });
  
  // Route handler to retrieve all suppliers
  router.get('/', async (request, response) => {
    try {
      const sups = await Sup.find({});                            // Finding all suppliers in the database
      return response.status(200).send(sups);                     // Sending the retrieved suppliers as a response
    } catch (error) {
      console.log(error.message);                                 // Logging any errors
      response.status(500).send({ message: error.message });      // Sending an error response
    }
  });
  
  // Route handler to retrieve a specific supplier by ID
  router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;                              // Extracting the ID parameter from the request
      const sups = await Sup.findById(id);                       // Finding the supplier by ID in the database
      return response.status(200).send(sups);                    // Sending the retrieved supplier as a response
    } catch (error) {
      console.log(error.message);                                 // Logging any errors
      response.status(500).send({ message: error.message });     // Sending an error response
    }
  });
  
  // Route handler to update a specific supplier by ID
  router.put('/:id', async (request, response) => {
    try {
      // Checking if all required fields are provided in the request body
      if (
        !request.body.supplierName ||
        !request.body.address ||
        !request.body.contactNumber ||
        !request.body.email ||
        !request.body.supplierType ||
        !request.body.contractExpiary
      ) {
        return response.status(400).send({ message: 'Send all required fields' });
      }
  
      const { id } = request.params;                                                    // Extracting the ID parameter from the request
      const result = await Sup.findByIdAndUpdate(id, request.body);                     // Updating the supplier document in the database
      if (!result) {
        return response.status(404).json({ message: 'Profile not found' });             // Sending a 404 response if the supplier is not found
      }
      return response.status(200).send({ message: "Profile updated successfully" });    // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                            // Sending an error response
    }
  });
  
  // Route handler to delete a specific supplier by ID
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;                                                  // Extracting the ID parameter from the request
      const supp = await Sup.findByIdAndDelete(id);                                    // Deleting the supplier document from the database
      if (!supp) {
        return response.status(404).json({ message: 'Profile not found' });            // Sending a 404 response if the supplier is not found
      }
      return response.status(200).send({ message: "Profile removed successfully" });   // Sending a success response
    } catch (error) {
      console.log(error.message);                                                      // Logging any errors
      response.status(500).send({ message: error.message });                           // Sending an error response
    }
  });

  export default router;