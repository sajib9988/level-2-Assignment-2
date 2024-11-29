"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./module/product/product.route"));
const order_route_1 = require("./module/order/order.route");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use('/api/product', product_route_1.default);
app.use('/api/order', order_route_1.orderRoutes);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server Live ⚡',
    });
});
exports.default = app;
