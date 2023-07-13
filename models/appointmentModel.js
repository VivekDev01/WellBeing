import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    doctorInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
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
}, {
    timestamps: true
})

const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;