import express from "express";
import { DeliveryDetails } from "../models/deliveryDetailsModel.js";

const router = express.Router();
//get delivery details by id
router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const deliveryDetails = await DeliveryDetails.findById(id);
  
      if (!deliveryDetails) {
        return response
          .status(404)
          .send({ message: "Delivery details not found" });
      }
      return response.status(200).send(deliveryDetails);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  export default router;