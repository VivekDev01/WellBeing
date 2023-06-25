import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

const getDoctorInfoController= async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message: "Doctor data fetched successfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching doctor details"
        })
    }
}


const updateProfileContoller = async(req, res) =>{
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body);
        res.status(201).send({
            success:true,
            message: "Doctor Profile Updated",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating doctor profile"
        })
    }
}

//Get single doctor info by id
const getDoctorByIdController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId})
        res.status(200).send({
            success:true,
            message: "Single Doctor data fetched successfully",
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching single doctor details"
        })
    }
}


const doctorAppointmentsController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        const appointments = await appointmentModel.find({doctorId: doctor._id})
        
        res.status(200).send({
            success:true,
            message: "Doctor appointments fetched successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching doctor appointments"
        })
    }
}


const updateStatusController = async(req, res) => {
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user= await userModel.findOne({_id: appointments.userId})
        const Notification= user.Notification
        Notification.push({
            type:"Status-updated",
            message: `Your Appointment has been updated ${status}`,
            onclickPath:'/doctor-appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message: "Appointment status updated successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating appointment status"
        })
    }
}


export {getDoctorInfoController, updateProfileContoller, getDoctorByIdController, doctorAppointmentsController, updateStatusController}