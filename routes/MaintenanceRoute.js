import express, { request, response } from "express";
import { Maintenance } from "../models/MaintenanceModel.js";
import { MP } from "../models/machinePart.js";
import { Machine } from "../models/machinesModes.js";

const router = express.Router();

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


  //Route for save a new maintenance 
router.post('/', async(request, response) => {

    try {
      if(
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
      if (!part.PartID || !part.partName || !part.condition || !part.quantity) {
        return response.status(400).send({
          message: 'Each part must have an partID and part Name',
        });
      }
    }

      const newMaintenance = {
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


export default router;