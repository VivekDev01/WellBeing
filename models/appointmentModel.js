import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    doctorId:{
        type: String,
        required: true
    },  
    hospitalId:{
        type: String,
        required: true
    },
    hospitalInfo:{
        type: String,
        required: true
    },
    doctorInfo:{
        type:String, 
        required: true
    },
    userInfo:{
        type:String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "pending"
    },
    time:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;