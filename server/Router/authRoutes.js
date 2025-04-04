import express from "express";
import {registor, loginUser} from "../Controller/authController.js"
const router = express.Router();

router.post('/register', registor);
router.post('/login', loginUser);

export default router; 