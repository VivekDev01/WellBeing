import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getAllDoctorsController, getAllUsersController } from "../controllers/adminCtrl.js";

const adminRouter = express.Router()

//GET METHOD || USERS
adminRouter.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET METHOD || DOCTORS
adminRouter.get("/getAllDoctors", authMiddleware, getAllDoctorsController)

//GET METHOD || HOSPITALS
// adminRouter.get("/getAllHospitals", authMiddleware, getAllHospitalsController)

export default adminRouter;