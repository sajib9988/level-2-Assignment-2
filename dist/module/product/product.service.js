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
const product_model_1 = __importDefault(require("./product.model"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.default(payload);
    return yield product.save();
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.find({});
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findById(id);
});
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndUpdate(id, payload, { new: true });
});
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findByIdAndDelete(id);
});
// for search product ...
const searchProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: "i" } }
        ]
    };
    return yield product_model_1.default.find(searchQuery);
});
exports.default = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
    searchProduct,
};
