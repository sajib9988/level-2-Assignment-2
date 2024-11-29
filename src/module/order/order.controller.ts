/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import orderService from './order.service';


export const createOrder = async (req: Request, res: Response) => {
  try {

    // first take a data from body
    const { email, product, quantity } = req.body;
    
    // then take new order with Product objectId
    const order = await orderService.createOrder({
      email,
      product,
      quantity,
      totalPrice: 0
    });

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: order
    });
  } catch (error:any) {
    const statusCode = error.message === 'Insufficient stock' ? 400 : 500;
    
    res.status(statusCode).json({
      message: error.message || 'An any error occurred',
      success: false,
      error: {
        name: error.name,
        message: error.message
      }
    });
  }
};
// Revenue Part Controller call to  
export const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue }
    });
  } catch (error:any) {
    res.status(500).json({
      message: error.message || 'An any error occurred',
      success: false,
      error: {
        name: error.name,
        message: error.message
      }
    });
  }
};

export const getOrderCountAndDetails = async (req: Request, res: Response) => {
  try {
    // Call the service to fetch order count and details
    const { totalOrders, orders } = await orderService.getOrderCountAndDetails();

    res.status(200).json({
      message: 'Orders fetched successfully',
      status: true,
      data: { totalOrders, orders },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'An any error occurred',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

  











export const orderController = {
    createOrder,
    calculateRevenue,
    getOrderCountAndDetails,
  };
  

  export default orderController;