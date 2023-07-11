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
    doctorInfo:{
        type:String, 
        required: true
    },
    userInfo:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "pending"
    },
    time:{
        type: Date,
        default: Date.now,
        required: [true, "Work start timing is required"]
    },
},{
    timestamps: true
})

const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;