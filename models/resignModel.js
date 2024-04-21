import mongoose from "mongoose";

const resignSchema = mongoose.Schema(
  {
    empID: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reason: [
      {
        type: String,
        required: true,
      },
    ],
    resignDate: {
      type: Date,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Resign = mongoose.model("Resign", resignSchema);
