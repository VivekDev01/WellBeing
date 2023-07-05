import mongoose from "mongoose";

const hospitalSchema= new mongoose.Schema({
    userId:{
        type: String
    },
    name:{
        type:String,
        required: [true, "First name is required"]
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
    timing:{
        type: Object,
        required: [true, "Work timing is required"]
    },
    status:{
        type:String,
        default: 'Pending'
    },

}, {timestamps:true});
//timestamps: true ----> to capture all the time

console.log(mongoose.modelNames());

const hospitalModel= mongoose.model('hospitals', hospitalSchema)

export default hospitalModel;