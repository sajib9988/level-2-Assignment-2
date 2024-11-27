import { Router } from 'express'
import { ProductController } from './product.controller';


const productRouter = Router()




productRouter.post('/create',ProductController.createProduct); 
productRouter.get('/', ProductController.getAllProduct); 
productRouter.get('/:id', ProductController.getSingleProduct); 
productRouter.put('/:id', ProductController.updateProduct); 
productRouter.delete('/:id', ProductController.deleteProduct); 

export default productRouter;

