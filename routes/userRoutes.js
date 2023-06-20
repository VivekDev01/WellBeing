import express from "express";
import { loginController, registerController } from "../controllers/userCtrl";

//rputer object
const router = express.Router()

//routes

//LOGIN || POST
router.post('/login', loginController)

//REGISTER || POST
router.post('/register', registerController)

module.exports=router;