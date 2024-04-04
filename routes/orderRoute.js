import express from "express";
import { Order } from "../models/orderModel.js";

const router = express.Router();

//Add order
router.post("/", async (request, response) => {
  try {

    if (
      !request.body.userId ||
      !request.body.products ||
      !request.body.deliveryDetails ||
      !request.body.paymentId
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    const newOrder = {
      userId: request.body.userId,
      products: request.body.products,
      deliveryDetails: request.body.deliveryDetails,
      paymentId: request.body.paymentId,
    };

    const order = await Order.create(newOrder);

    return response.status(201).send(order);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get order
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const order = await Order.find({ userId: id });

    return response.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all orders
router.get("/", async (request, response) => {
  try {
    const orders = await Order.find({});

    return response.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update order
router.put("/", async (request, response) => {
  try {
    const { id } = request.body.orderId;
    const result = await Order.findByIdAndUpdate( id, request.body);

    if(!result) {
      return response.status(404).json({ message: "Order not found" });
    }
    return response.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
    }
});

export default router;