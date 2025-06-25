import express from 'express'
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from '../controllers/orderController.js'
import authMiddleware from '../middleware/auth.js'


const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders', authMiddleware,userOrders)//use middleware bcz of userId
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateOrderStatus)

export default orderRouter;