import exprress from "express";
import {Item} from "../models/itemsModel.js";

const router = exprress.Router();

//get items by newandtrending
router.get("/trending", async (request, response) => {
  try {
    const items = await Item.find({ trending: true });

    return response.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//create item
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.price ||
      !request.body.category ||
      !request.body.description ||
      !request.body.image ||
      !request.body.colors ||
      !request.body.sizes ||
      !request.body.trending
    ) {
      return response.status(400).send({
        message: "All fields are required",
      });
    }
    const newItem = {
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      category: request.body.category,
      image: request.body.image,
      colors: request.body.colors,
      sizes: request.body.sizes,
      trending: request.body.trending,
    };

    const item = await Item.create(newItem);

    return response.status(201).send(item);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all items
router.get("/", async (request, response) => {
  try {
    const items = await Item.find({});

    return response.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get item by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const items = await Item.findById(id);

    return response.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update item
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Item.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Item not found" });
    }
    return response.status(200).json({ message: "Item Updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete item
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Item.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Item not found" });
    }
    return response.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;