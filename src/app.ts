import express, { Request, Response } from 'express'
import productRouter from './module/product/product.route'
import { orderRoutes } from './module/order/order.route';
import cors from "cors";

const app = express()


app.use(cors());

// middleware
app.use(express.json())

app.use('/api/products', productRouter )
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

export default app