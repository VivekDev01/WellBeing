import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getDoctorInfoController } from "../controllers/doctorCtrl.js";

const doctorRouter = express.Router()

//POST SINGLE DOCTOR
doctorRouter.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

export default doctorRouter;