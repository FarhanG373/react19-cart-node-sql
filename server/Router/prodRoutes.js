import express from "express";
import {getAllProd, addProduct, getSingleProduct} from "../Controller/prodController.js"
const router = express.Router();

router.get('/allProduct', getAllProd);
router.post('/addProduct', addProduct);
router.get('/getSingleProduct/:id', getSingleProduct);
export default router; 