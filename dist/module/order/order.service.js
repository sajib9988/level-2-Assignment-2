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
exports.getOrderCountAndDetails = exports.calculateRevenue = exports.createOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("./../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
// Create a new order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // Start a new MongoDB session for transaction management
    const session = yield mongoose_1.default.startSession();
    try {
        // Use withTransaction to ensure atomic operation (all-or-nothing)
        return yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // Find the product being ordered
            const product = yield product_model_1.default.findById(orderData.product);
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
            yield product.save();
            // Create new order instance
            const order = new order_model_1.default(Object.assign(Object.assign({}, orderData), { totalPrice: product.price * orderData.quantity }));
            // Save and return the new order
            return order.save();
        }));
        // eslint-disable-next-line no-useless-catch
    }
    catch (error) {
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.createOrder = createOrder;
// Calculate total revenue
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const revenue = yield order_model_1.default.aggregate([
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
    return ((_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
});
exports.calculateRevenue = calculateRevenue;
const getOrderCountAndDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all orders and count them
    const orders = yield order_model_1.default
        .find()
        .populate('product', 'name price') // Populate product details
        .select('-__v')
        .exec();
    const totalOrders = orders.length;
    return { totalOrders, orders };
});
exports.getOrderCountAndDetails = getOrderCountAndDetails;
// Create the orderService object yes
const orderService = {
    createOrder: exports.createOrder,
    calculateRevenue: exports.calculateRevenue,
    getOrderCountAndDetails: exports.getOrderCountAndDetails
};
exports.default = orderService;
