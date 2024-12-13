import { Router } from 'express'
import { ProductController } from './product.controller';


const productRouter = Router()




productRouter.post('/',ProductController.createProduct); 
productRouter.get('/:productId', ProductController.getSingleProduct); 
productRouter.put('/:productId', ProductController.updateProduct); 
productRouter.delete('/:productId', ProductController.deleteProduct); 
productRouter.get('/', ProductController.getAllProduct); 

export default productRouter;

  