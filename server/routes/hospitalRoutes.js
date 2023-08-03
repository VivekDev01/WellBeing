import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { getHospitalInfoController, updateHospitalProfileContoller, getHospitalByIdController, hospitalAppointmentsController, updateHospitalStatusController } from "../controllers/hospitalCtrl.js"

const hospitalRouter = express.Router()


//POST SINGLE Hospital
hospitalRouter.post('/getHospitalInfo', authMiddleware, getHospitalInfoController)

// ---------------------------------------------------------------

//  POST || UPDATE PROFILE
hospitalRouter.post('/updateHospitalProfile', authMiddleware, updateHospitalProfileContoller)

//POST || GET SINGLE Hospital INFO
hospitalRouter.post('/getHospitalById', authMiddleware, getHospitalByIdController)  

//GET || Appointment List
hospitalRouter.get('/hospital-appointments', authMiddleware, hospitalAppointmentsController)

//POST || Update Appointment Status
hospitalRouter.post('/update-status', authMiddleware, updateHospitalStatusController)

export default hospitalRouter; 