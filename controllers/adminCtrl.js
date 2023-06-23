import doctorModel from "../models/doctorModel.js"
import userModel from "../models/userModel.js"

const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:"Users data list fetched successfully",
            data:users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error while fetching users", 
            error
        })
    }
}

const getAllDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:"Doctors data list fetched successfully",
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while fetching doctors"
        })
    }
}

// const getAllHospitalsController = async() => {
//     try {
//         const hospitals = await hospitalModel.find({})
//         res.status(200).send({
//             success:true,
//             message:"Hospitals data list fetched successfully",
//             data:hospitals
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success: false,
//             message: "Error while fetching hospitals"
//         })
//     }
// }


//doctor account status
const changeAccountStatusController = async(req, res)=>{
    try {
        const {doctorId, status} =req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user = await userModel.findOne({_id:doctor.userId})
        const Notification= user.Notification;
        Notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Doctor Account Request has ${status}`,
            onClickPath:'/Notification'
        })
        user.isDoctor === 'approved' ? true: false
        await user.save()
        res.status(201).send({
            success:true,
            message:"Account Status Updated",
            data: doctor
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in Account status",
            error
        })
    }
}

export {getAllDoctorsController,  getAllUsersController, changeAccountStatusController};