import mongoose from "mongoose";

const hospitalAppointmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    
    hospitalId:{
        type: String,
        required: true
    },
    hospitalInfo:{
        type: Object,
    },
    userInfo:{
        type:Object,
    },
    date: {
        type: String,
        // default: Date.now(), 
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    time: {
        type: String,
        // default: Date.now(), 
        required: true
    },
},{
    timestamps: true
})

const hospitalAppointmentModel = mongoose.model("hospital-appointments", hospitalAppointmentSchema);

export default hospitalAppointmentModel;