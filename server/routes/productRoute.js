import express from "express";
import { upload }  from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js";

const productRouter = express.Router();

// The first argument to upload.array should be the field name as a string.
// Example: if your client sends files under the field 'productImages', use 'productImages' here.
// Assuming 'images' is the field name used in your client-side FormData.
productRouter.post('/add', authSeller, upload.array("images", 5), addProduct); // Max 5 images, field name "images"
productRouter.get('/list', productList)
+productRouter.get('/:id',productById) // Added :id parameter for fetching a specific product
 productRouter.post('/stock', authSeller, changeStock)
 
 export default productRouter;