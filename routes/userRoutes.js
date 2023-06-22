import express from "express";
import { authController, loginController, registerController, applyDoctorController  } from "../controllers/userCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

//rputer object
const router = express.Router()

//routes

//LOGIN || POST
router.post('/login', loginController)

//REGISTER || POST
router.post('/register', registerController)

//Authorization || POST
router.post('/getUserData', authMiddleware, authController)

//Apply as a doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController)


export default router;