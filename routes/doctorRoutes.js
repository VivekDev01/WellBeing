import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getDoctorInfoController, updateProfileContoller } from "../controllers/doctorCtrl.js";

const doctorRouter = express.Router()

//POST SINGLE DOCTOR
doctorRouter.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//  POST UPDATE PROFILE
doctorRouter.post('/updateProfile', authMiddleware, updateProfileContoller)

export default doctorRouter;