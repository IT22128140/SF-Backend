import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    required: true,
  },
  colors: [
    {
      type: String,
      required: false,
    },
  ],
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Item = mongoose.model("Item", itemSchema);
