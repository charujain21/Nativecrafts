import express from "express";
import authUser from "../middleware/authUser.js";
import { getUserOrders, placeOrderCOD, placeOrderStripe, getAllOrders } from "../controllers/orderController.js";
import authSeller from "../middleware/authSeller.js";
// import Order from "../models/Order.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/stripe', authUser, placeOrderStripe)

export default orderRouter;