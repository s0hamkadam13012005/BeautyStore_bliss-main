import {createProduct, updateProduct, deleteProduct, getProduct, getALLproducts, ratingProduct} from '../controller/product.controller.js';
import  protect  from '../Middleware/auth.middleware.js';

import express from 'express';
const router = express.Router();

router.put("/rating/:productId",ratingProduct);

router.get("/",protect,getALLproducts);

router.get("/:id",getProduct);

router.post("/",createProduct);

router.put("/:id",updateProduct);

router.delete("/:id",deleteProduct);

export default router;