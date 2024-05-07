import exprress from "express";
import { Cart } from "../models/cartModel.js";
import { Item } from "../models/itemsModel.js";

const router = exprress.Router();

//delete cart items
router.put("/:userId/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.params;

    let cart = await Cart.findOne({ userId: userId});

    if (!cart) {
      response.status(404).send({ message: "Cart not found." });
      return;
    }

    let result = await Cart.updateOne({userId: userId},{ $pull: { items: { _id: id } } });

    if (!result.nModified) {
      return response.status(404).json({ message: "Item not found" });
    }
    return response.status(200).send({ message: "Cart updated successfully" });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/minus/:userId/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.params;

    let cart = await Cart.findOne({ userId: userId});

    if (!cart) {
      response.status(404).send({ message: "Cart not found." });
      return;
    }

    let itemIndex = cart.items.findIndex((p) => p._id == id);

    if (itemIndex !== -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity = productItem.quantity - 1;
      cart.items[itemIndex] = productItem;
    } else {
      // Handle the case where the product is not found
      response.status(404).send({ message: "Product not found in cart." });
      return;
    }

    // Save the updated cart back to the database
    await cart.save();

    // Send a success response
    response.status(200).send({ message: "Quantity updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal Server Error." });
  }
});

router.put("/plus/:userId/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.params;

    let cart = await Cart.findOne({ userId: userId});

    if (!cart) {
      response.status(404).send({ message: "Cart not found." });
      return;
    }

    let itemIndex = cart.items.findIndex((p) => p._id == id);

    if (itemIndex !== -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity = productItem.quantity + 1;
      cart.items[itemIndex] = productItem;
    } else {
      // Handle the case where the product is not found
      response.status(404).send({ message: "Product not found in cart." });
      return;
    }

    // Save the updated cart back to the database (assuming you have a save method)
    await cart.save();

    // Send a success response
    response.status(200).send({ message: "Quantity updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal Server Error." });
  }
});

//Add item to cart
router.post("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const { _id, productId, quantity, color, size, name, price, image } = request.body;
    let cart = await Cart.findOne({ userId: userId});
    let item = await Item.findOne({ _id: _id });

    if (!item) {
      return response.status(400).send({
        message: "Item not found",
      });
    }

    //if cart exists for user
    if (cart) {
      let itemIndex = cart.items.findIndex(
        (p) => p.productId == productId && p.color == color && p.size == size
      );

      //product exists in the cart, update the quantity
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity = Number(productItem.quantity) + Number(quantity);
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, quantity, color, size, price, name, image });
      }
      cart = await cart.save();
      return response.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId: userId,
        items: [{ productId, quantity, color, size, price, name, image }],
      });
      return response.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get cart for user
router.get("/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const cart = await Cart.findOne({ userId: userId });

    return response.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;
