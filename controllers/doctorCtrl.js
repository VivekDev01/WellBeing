import doctorModel from "../models/doctorModel.js"

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

export {getDoctorInfoController}