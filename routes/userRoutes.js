import express from "express";
import { authController, loginController, registerController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController } from "../controllers/userCtrl.js";
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

//Notification|| POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

//Notification|| POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

//Get all doctors || GET
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)


//Book Appointment || POST
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//BOOKING AVAILABILITY || POST
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//Appointments List || GET
router.get('/user-appointments', authMiddleware, userAppointmentsController)

export default router;