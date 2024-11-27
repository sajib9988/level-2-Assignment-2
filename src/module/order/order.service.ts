import mongoose, { Collection } from 'mongoose';
import { IOrder } from './order.interface';
import Product from './../product/product.model';
import orderModel from './order.model';

// Create a new order
export const createOrder = async (orderData: IOrder) => {
  const session = await mongoose.startSession();
  
  try {
    // Start a transaction
    session.startTransaction();

    // Find the product
    const product = await Product.findById(orderData.product);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if sufficient stock is available
    if (product.quantity < orderData.quantity) {
      throw new Error('Insufficient stock');
    }

    // Calculate total price
    const totalPrice = product.price * orderData.quantity;

    // Create the order
    const order = new orderModel({
      ...orderData,
      totalPrice
    });

    // Update product quantity
    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;

    // Save the updated product and new order
    await product.save({ session });
    const savedOrder = await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    return savedOrder;
  } catch (error) {
    // Abort the transaction on error
    await session.abortTransaction();
    throw error;
  } finally {
    // End the session
    session.endSession();
  }
};

// Calculate total revenue
export const calculateRevenue = async () => {
  const revenue = await orderModel.aggregate([
    {
      $lookup: {
        from: 'products', // Assuming the product collection name
        localField: 'product', 
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $unwind: '$productDetails'
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$quantity', '$productDetails.price']
          }
        }
      }
    }
  ]);

  return revenue[0]?.totalRevenue || 0;
};

// Create the orderService object
const orderService = {
  createOrder,
  calculateRevenue
};

export default orderService;