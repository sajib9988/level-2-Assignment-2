import { Request, Response } from "express";
import ProductService from "./product.service"; 


const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await ProductService.create(req.body); 
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
    const searchTerm = req.query.searchTerm as string; 
    let result;

    if (searchTerm) {
      result = await ProductService.searchProduct(searchTerm); 
    } else {
      result = await ProductService.getAll();
    }

    res.send({
      success: true,
      message: "Products retrieved successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; // পণ্য ID
    const result = await ProductService.getById(id);

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
    const id = req.params.id;
    const result = await ProductService.updateById(id, req.body);

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

// delete option
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const result = await ProductService.deleteById(id);

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
  } catch (error: any) {
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
