import { IProduct } from "./product.interface";
import Product from "./product.model";


const create = async (payload: IProduct) => {
  const product = new Product(payload);
  return await product.save();
};


const getAll = async () => {
  return await Product.find({});
};


const getById = async (id: string) => {
  
  return await Product.findById(id);
};

const updateById = async (id: string, payload: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};


const deleteById = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

// for search product ...
const searchProduct =async(searchTerm:string)=>{
    const searchQuery={
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: "i" } }
    ]
    
      }
            
      return await Product.find(searchQuery)


    


}

export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  searchProduct,
};
