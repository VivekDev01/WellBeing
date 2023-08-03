import express from "express";
import { authController, loginController, registerController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, applyHospitalController, getAllHospitalsController, bookHospitalAppointmentController, bookingHospitalAvailabilityController } from "../controllers/userCtrl.js";
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

//Apply as a hospital || POST
router.post('/apply-hospital', authMiddleware, applyHospitalController)

//Notification|| POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

//Notification|| POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

//Get all doctors || GET
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)


//Get all hospitals || GET
router.get('/getAllHospitals', authMiddleware, getAllHospitalsController)


//Book Appointment || POST
router.post('/book-appointment', authMiddleware, bookAppointmentController)

router.post('/book-hospital-appointment', authMiddleware, bookHospitalAppointmentController)

//BOOKING AVAILABILITY || POST
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

router.post('/booking-hospital-availability', authMiddleware, bookingHospitalAvailabilityController)

//Appointments List || GET
router.get('/user-appointments', authMiddleware, userAppointmentsController)

export default router;