import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Calculate total revenue
router.get('/revenue', orderController.calculateRevenue);

export const orderRoutes = router;