import express from "express";
const router = express.Router();
import { createOrder, deleteOrder, getAllOrders,  getUserOrder, updateOrder } from "../controller/order.controller.js";

import  protect from '../Middleware/auth.middleware.js';


router.post("/",createOrder);

router.put("/:id",updateOrder);

router.delete("/:id",deleteOrder);

router.get("/find/:userId",getUserOrder);

router.get("/",protect,getAllOrders);

export default router;