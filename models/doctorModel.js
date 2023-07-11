import mongoose from "mongoose";

const doctorSchema= new mongoose.Schema({
    userId:{
        type: String
    },
    firstName:{
        type:String,
        required: [true, "First name is required"]
    },
    lastName:{
        type: String,
        required: [true, "Last Name is required"]
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"]
    },
    email:{
        type:String,
        required: [true, "Email is required"]
    },
    website:{
        type: String, 
    },
    address:{
        type: String,
        required: [true, "Adress is required"]
    },
    specialization:{
        type: String,
        required: [true, "Specialization is required"]
    },
    experience:{
        type:String,
        required: [true, "Experience is required"]
    },
    feesPerConsultation:{
        type: Number,
        require: [true, "Fee detail is required"]
    },
    timing_start:{
        type: Date,
        default: Date.now,
        required: [true, "Work start timing is required"]
    },
    timing_end:{
        type: Date,
        default: Date.now,
        required: [true, "Work end timing is required"]
    },
    status:{
        type:String,
        default: 'Pending'
    },

}, {timestamps:true});
//timestamps: true ----> to capture all the time

const doctorModel= mongoose.model('doctors', doctorSchema)

export default doctorModel;