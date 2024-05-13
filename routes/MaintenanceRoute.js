import express, { request, response } from "express";
import { Maintenance } from "../models/MaintenanceModel.js";
import { MP } from "../models/machinePartModel.js";
import { Machine } from "../models/machinesModes.js";

const router = express.Router();

 //Route for get MachineParts
 router.get('/mparts', async (request, response) => {
  try {
    // Fetching only required fields using select()
    const mparts = await MP.find({})
                           .select('partID partName condition');

    return response.status(200).json({
      count: mparts.length,
      data: mparts
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get Maintenance records by MachineID
router.get('/machine/:machineID', async (request, response) => {
  try {
      const { machineID } = request.params;

      // Find all maintenance records with the specified MachineID
      const maintenanceRecords = await Maintenance.find({ MachineID: machineID });

      return response.status(200).json(maintenanceRecords);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

//Route for get Sewing Machines
router.get('/sewingmachines', async (request, response) => {
    try {
      // Fetching only required fields using select()
      const sewingMachines = await Machine.find({Category: "sewing Machine" })
                                          .select('MachineID MachineName Category');
  
      return response.status(200).json({
        count: sewingMachines.length,
        data: sewingMachines
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  


  // Route for sending notifications for maintenance
router.get('/send-notifications', async (request, response) => {
  try {
    // Find all unique MachineIDs from maintenance records
    const machineIDs = await Maintenance.distinct("MachineID");

    const notifications = [];

    for (const machineID of machineIDs) {
      // Find the last maintenance record where Oiled is true for the current machineID
      const lastOiledMaintenance = await Maintenance.findOne({ MachineID: machineID, Oiled: "yes" }).sort({ Date: -1 });

      if (lastOiledMaintenance) {
        // Calculate the next maintenance date
        const nextMaintenanceDate = new Date(lastOiledMaintenance.Date);
        nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + 7);

        // If the next maintenance date is today or in the past, create a notification
        if (nextMaintenanceDate <= new Date()) {
          // Format the next maintenance date
          const formattedDate = nextMaintenanceDate.toDateString();
          
          // Create a notification message for upcoming maintenance
          const upcomingMessage = `Upcoming maintenance for machine ${machineID} on ${formattedDate}.`;

          // Push the upcoming maintenance notification message to the array
          notifications.push(upcomingMessage);
        }

        // If the next maintenance date is in the future, create a notification
        if (nextMaintenanceDate > new Date()) {
          // Format the next maintenance date
          const formattedDate = nextMaintenanceDate.toDateString();
          
          // Create a notification message for upcoming maintenance
          const upcomingMessage = `Upcoming maintenance for machine ${machineID} on ${formattedDate}.`;

          // Push the upcoming maintenance notification message to the array
          notifications.push(upcomingMessage);
        }
      }
    }

    return response.status(200).json(notifications);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




  //Route for save a new maintenance 
router.post('/', async(request, response) => {

    try {
      if(
        !request.body.MaintenanceID||
        !request.body.Date ||
        !request.body.MachineID ||
        !request.body.MachineName ||
        !request.body.Category ||
        !request.body.Machineparts ||
        !request.body.ChangedMotor ||
        !request.body.ChangedNeedle||
        !request.body.Oiled
      ){
        return response.status(404).send({
          message: 'Send all required fields of the maintenance table',
        });
      }

      // Ensure that Machine Parts is an array
    if (!Array.isArray(request.body.Machineparts)) {
      return response.status(400).send({
        message: 'Machine Parts must be an array of objects',
      });
    }

    // Validate each machine part object in the array
    for (const part of request.body.Machineparts) {
      if (!part.partID || !part.partName || !part.condition ) {
        return response.status(400).send({
          message: 'Each part must have an partID and part Name and Condition',
        });
      }
    }

      const newMaintenance = {
        MaintenanceID: request.body.MaintenanceID,
        Date: request.body.Date,
        MachineID: request.body.MachineID,
        MachineName: request.body.MachineName,
        Category: request.body.Category,
        Machineparts: request.body.Machineparts,
        ChangedMotor: request.body.ChangedMotor,
        ChangedNeedle: request.body.ChangedNeedle,
        Oiled: request.body.Oiled,
      };
  
      const maintenance = await Maintenance.create(newMaintenance);
  
      return response.status(201).send(maintenance)
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });


  //Route for Get All Maintenance from database
  
  router.get('/', async(request, response) => {
    try {
      const maintenance = await Maintenance.find({});
      
      return response.status(200).json({
        count: maintenance.length,
        data: maintenance
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });

  

   //Route for Get One Maintenance from database by id
   router.get('/:id', async(request, response) => {
    try {
      const { id } = request.params;
  
      const maintenance = await Maintenance.findById(id);
  
      return response.status(200).json(maintenance);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
    }
  });


   // Route for update a Maintenance
   router.put('/:id', async (request, response) => {
    try {
      if(
        !request.body.MaintenanceID||
        !request.body.Date ||
        !request.body.MachineID ||
        !request.body.MachineName ||
        !request.body.Category ||
        !request.body.Machineparts ||
        !request.body.ChangedMotor ||
        !request.body.ChangedNeedle||
        !request.body.Oiled
      ) {
        return response.status(400).send({
          message: 'Send all required fields:',
        });
      }
  
      const { id } = request.params;
  
      const result = await Maintenance.findByIdAndUpdate(id, request.body);
  
      if(!result) {
        return response.status(404).json({ message: 'Miantenance not found'});
      }
  
      return response.status(200).send({ message: 'Maintenance updated successfully'});
  
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });
  
  
  //Route for delete a Maintenance
  router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Maintenance.findByIdAndDelete(id);
  
      if(!result){
        return response.status(404).json({ message: 'Maintenance not found'});
      }
  
      return response.status(200).send({ message: 'Maintenance deleted successfully'});
      
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message});
    }
  });



export default router;