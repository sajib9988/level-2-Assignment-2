import { Request, Response } from "express";
import Product from "./product.model";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Product.create(req.body);
    res.send({
      success: true,
      message: "Product created successfully",
      result,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Product.find({});
    res.send({
      success: true,
      message: "All Products",
      result,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Extract the product ID from request parameters
    const result = await Product.findById(id); // Find the product by ID

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
  } catch (error: any) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Extract the product ID from request parameters
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true }); // Update the product

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
  } catch (error: any) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // Extract the product ID from request parameters
    const result = await Product.findByIdAndDelete(id); // Delete the product by ID

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
    catch (error:any) {
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error: error.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
