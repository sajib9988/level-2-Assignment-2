import {  ObjectId } from "mongoose";

export interface IOrder {
  email: string; // Customer's email
  product: ObjectId; // Reference to the product (foreign key)
  quantity: number; // Quantity ordered
  totalPrice: number; // Calculated total price (product price * quantity)
}
