import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getAllDoctorsController, getAllHospitalsController, getAllUsersController } from "../controllers/adminCtrl";

const router = express.Router()

//GET METHOD || USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

//GET METHOD || HOSPITALS
router.get("/getAllHospitals", authMiddleware, getAllHospitalsController)

export default router;