import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Regex for email validation
        message: "Invalid email format",
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"], // Minimum value validation
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price must be a positive number"], // Ensure price is positive
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model<IOrder>("Order", orderSchema);
