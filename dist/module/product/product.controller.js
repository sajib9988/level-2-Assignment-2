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
exports.ProductController = void 0;
const product_service_1 = __importDefault(require("./product.service"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.default.create(req.body);
        res.send({
            success: true,
            message: "Product created successfully",
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        let result;
        if (searchTerm) {
            result = yield product_service_1.default.searchProduct(searchTerm);
        }
        else {
            result = yield product_service_1.default.getAll();
        }
        res.send({
            success: true,
            message: "Products retrieved successfully",
            result,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.default.getById(id);
        if (!result) {
            res.send({
                success: false,
                message: "Product not found",
            });
            return;
        }
        res.send({
            success: true,
            message: "Product retrieved successfully",
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.default.updateById(id, req.body);
        if (!result) {
            res.send({
                success: false,
                message: "Product not found",
            });
            return;
        }
        res.send({
            success: true,
            message: "Product updated successfully",
            result,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
// delete option
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.default.deleteById(id);
        if (!result) {
            res.send({
                success: false,
                message: "Product not found",
            });
            return;
        }
        res.send({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
