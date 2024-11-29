import mongoose, { Collection } from 'mongoose';
import { IOrder } from './order.interface';
import Product from './../product/product.model';
import orderModel from './order.model';

// Create a new order

export const createOrder = async (orderData: IOrder) => {
  // Start a new MongoDB session for transaction management
  const session = await mongoose.startSession();
  
  try {
    // Use withTransaction to ensure atomic operation (all-or-nothing)
    return await session.withTransaction(async () => {
      // Find the product being ordered
      const product = await Product.findById(orderData.product);
      
      // Validate product existence and sufficient quantity
      if (!product || product.quantity < orderData.quantity) {
        // Throw error if product doesn't exist or stock is insufficient
        throw new Error('Invalid product or insufficient stock');
      }

      // Reduce product quantity based on order amount
      product.quantity -= orderData.quantity;
      
      // Update product's in-stock status
      // Set to false if quantity reaches zero
      product.inStock = product.quantity > 0;
      
      // Save updated product information
      await product.save();

      // Create new order instance
      const order = new orderModel({ 

        ...orderData, 
   
        totalPrice: product.price * orderData.quantity 
      });
      
      // Save and return the new order
      return order.save();
    });
  } catch (error) {

    throw error;
  } finally {
 
    session.endSession();
  }
};
// Calculate total revenue
export const calculateRevenue = async () => {
  const revenue = await orderModel.aggregate([
    {
      $lookup: {
        from: 'products', 
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
export const getOrderCountAndDetails = async () => {
  // Fetch all orders and count them
  const orders = await orderModel
    .find()
    .populate('product', 'name price') // Populate product details
    .select('-__v') 
    .exec();

  const totalOrders = orders.length;

  return { totalOrders, orders };
};




// Create the orderService object yes
const orderService = {
  createOrder,
  calculateRevenue,
  getOrderCountAndDetails 
};

export default orderService; 