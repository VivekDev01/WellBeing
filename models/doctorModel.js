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
    timing:{
        type: Object,
        required: [true, "Work timing is required"]
    },

}, {timestamps:true});
//timestamps: true ----> to capture all the time

const doctorModel= mongoose.model('users', doctorSchema)

export default doctorModel;