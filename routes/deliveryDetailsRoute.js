import express from "express";
import { DeliveryDetails } from "../models/deliveryDetailsModel.js";

const router = express.Router();

//Add delivery details
router.post("/:userId", async (request, response) => {

  const { userId } = request.params;

  try {
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.contact ||
      !request.body.email ||
      !request.body.address ||
      !request.body.district ||
      !request.body.province ||
      !request.body.postalCode
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }

    const newDeliveryDetails = {
      userId: userId,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      contact: request.body.contact,
      email: request.body.email,
      address: request.body.address,
      district: request.body.district,
      province: request.body.province,
      postalCode: request.body.postalCode,
    };

    const deliveryDetails = await DeliveryDetails.create(newDeliveryDetails);

    return response.status(201).send(deliveryDetails);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get delivery details
router.get("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    
    const deliveryDetails = await DeliveryDetails.find({ userId: userId });

    return response.status(200).send(deliveryDetails);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update delivery details
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await DeliveryDetails.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response
        .status(400)
        .send({ message: "Delivery details not found" });
    }
    return response
      .status(200)
      .send({ message: "Delivery details updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete delivery details
router.delete("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;

    const result = await DeliveryDetails.findOneAndDelete({ userId: userId });

    if (!result) {
      return response
        .status(404)
        .send({ message: "Delivery details not found" });
    }
    return response.status(200).send({ message: "Delivery details deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;