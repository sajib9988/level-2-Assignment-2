import express, { Request, Response } from 'express'
import productRouter from './module/product/product.route'
import { orderRoutes } from './module/order/order.route';


const app = express()

// middleware
app.use(express.json())

app.use('/api/product', productRouter )
app.use('/api/order', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

export default app