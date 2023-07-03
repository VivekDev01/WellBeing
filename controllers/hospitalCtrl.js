import hospitalModel from "../models/HospitalModel.js"
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"

const getHospitalInfoController= async(req, res) => {
    try {
        const hospital = await hospitalModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message: "hospital data fetched successfully",
            data: hospital
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching hospitals details"
        })
    }
}


const updateHospitalProfileContoller = async(req, res) =>{
    try {
        const hospital = await hospitalModel.findOneAndUpdate({userId:req.body.userId}, req.body);
        res.status(201).send({
            success:true,
            message: "Hospital Profile Updated",
            data: hospital
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating Hospital profile"
        })
    }
}

//Get single hospital info by id
const getHospitalByIdController = async(req, res) => {
    try {
        const hospital = await hospitalModel.findOne({_id: req.body.hospitalId})  //<---------------- may be error
        res.status(200).send({
            success:true,
            message: "Single Hospital data fetched successfully",
            data: hospital
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching single Hospital details"
        })
    }
}


const hospitalAppointmentsController = async(req, res) => {
    try {
        const hospital = await hospitalModel.findOne({userId: req.body.userId})
        const appointments = await appointmentModel.find({hospitalId: hospital._id})
        
        res.status(200).send({
            success:true,
            message: "Hospital appointments fetched successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching hospital appointments"
        })
    }
}


const updateHospitalStatusController = async(req, res) => {
    try {
        const {appointmentsId, status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status})
        const user= await userModel.findOne({_id: appointments.userId})
        const Notification= user.Notification
        Notification.push({
            type:"Status-updated",
            message: `Your Appointment has been updated ${status}`,
            onclickPath:'/hospital-appointments'
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


export {getHospitalInfoController, updateHospitalProfileContoller, getHospitalByIdController, hospitalAppointmentsController, updateHospitalStatusController}