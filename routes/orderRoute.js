import express from "express";
import { Order } from "../models/orderModel.js";

const router = express.Router();

// Get all ongoing orders
router.get("/ongoing", async (request, response) => {
  try {
    const orders = await Order.find({
      status: { $nin: ["Delivered", "Canceled"] },
    });
    return response.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all completed orders
router.get("/completed", async (request, response) => {
  try {
    const orders = await Order.find({
      $or: [{ status: "Delivered" }, { status: "Canceled" }],
    });
    return response.status(200).json(orders);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Add order
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.userId ||
      !request.body.products ||
      !request.body.deliveryDetails ||
      !request.body.total ||
      !request.body.paymentId
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    const newOrder = {
      userId: request.body.userId,
      products: request.body.products,
      deliveryDetails: request.body.deliveryDetails,
      total: request.body.total,
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
router.get("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const order = await Order.find({ userId: userId });

    return response.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update order
router.put("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const result = await Order.findByIdAndUpdate(userId, request.body);

    if (!result) {
      return response.status(404).json({ message: "Order not found" });
    }
    return response.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;