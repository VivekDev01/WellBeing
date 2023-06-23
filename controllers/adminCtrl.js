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

export {getAllDoctorsController,  getAllUsersController};