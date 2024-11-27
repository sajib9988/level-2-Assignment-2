import { model, Schema } from "mongoose";import { IProduct } from "./product.interface";
;

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], 
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true, 
  }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
