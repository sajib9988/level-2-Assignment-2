"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = exports.getOrderCountAndDetails = exports.calculateRevenue = exports.createOrder = void 0;
const order_service_1 = __importDefault(require("./order.service"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // first take a data from body
        const { email, product, quantity } = req.body;
        // then take new order with Product objectId
        const order = yield order_service_1.default.createOrder({
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
    }
    catch (error) {
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
});
exports.createOrder = createOrder;
// Revenue Part Controller call to  
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.default.calculateRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue }
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'An any error occurred',
            success: false,
            error: {
                name: error.name,
                message: error.message
            }
        });
    }
});
exports.calculateRevenue = calculateRevenue;
const getOrderCountAndDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service to fetch order count and details
        const { totalOrders, orders } = yield order_service_1.default.getOrderCountAndDetails();
        res.status(200).json({
            message: 'Orders fetched successfully',
            status: true,
            data: { totalOrders, orders },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || 'An any error occurred',
            success: false,
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
});
exports.getOrderCountAndDetails = getOrderCountAndDetails;
exports.orderController = {
    createOrder: exports.createOrder,
    calculateRevenue: exports.calculateRevenue,
    getOrderCountAndDetails: exports.getOrderCountAndDetails,
};
exports.default = exports.orderController;
