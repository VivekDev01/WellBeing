import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js"

//register callback
const registerController= async(req, res)=>{
    try {
        const existingUser= await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'User already exist', success:false})
        }
        const password= req.body.password;
        const confirmPassword= req.body.confirmPassword; 

        //if password not matches
        if(password!==confirmPassword){
            return res.status(200).send({message:'Confirm Password not matchs', success:false})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt); 
        req.body.password=hashedPassword;
        req.body.confirmPassword=hashedConfirmPassword;
        
        const newUser= new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Registered Successfully', success: true});


    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:`Register controller ${error.message}`})
    }
};


const loginController = async(req, res) =>{
    try {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({message:'User not found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password) 
        if(!isMatch){
            return res.status(200).send({message: 'Invalid Email or Password', success:false});
        }
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message:'Login Success', success:true, token});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
    }
}

const authController= async (req, res) => {
    try {
        const user =await userModel.findById({_id: req.body.userId})
        user.password= undefined;
        if(!user){
            return res.status(200).send({
                message: "User not found", success: false
            })
        }else{
            res.status(200).send({
                success: true, 
                data: user
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:'Auth Error',
            success: false, 
            error
        })
    }
}


const applyDoctorController = async(req, res) => {
    try {
        const newDoctor = await doctorModel({...req.body, status:'pending'})
        await newDoctor.save();
        const adminUser= await userModel.findOne({isAdmin:true})
        const Notification= adminUser.Notification
        Notification.push({
            type:"apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
            data:{
                doctorId:newDoctor._id,
                name: newDoctor.firstName +" "+newDoctor.lastName,
                onclickPath:'/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {Notification});
        res.status(201).send({
            success:true,
            message:'Registration for Dector Account is done'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while applying as a doctor'
        })
    }
}


const getAllNotificationController= async(req, res) => {
    try {
        const  user = await userModel.findOne({_id: req.body.userId})
        const seenNotification= user.seenNotification;
        const Notification = user.Notification;
        seenNotification.push(...Notification)
        user.Notification= []
        user.seenNotification = Notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: "All Notications are marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Error in Notification",
            success: false,
            error
        })
    }
}


const deleteAllNotificationController = async(req, res)=>{
    try {
        const  user = await userModel.findOne({_id: req.body.userId})
        user.Notification= []
        user.seenNotification = []
        const updatedUser= await user.save()
        updatedUser.password= undefined
        res.status(200).send({
            success:true,
            message:"Notifications Deleted Successfully",
            data:updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false, 
            message: "Unable to delete all no notifications",
            error
        })
    }
}


export {loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController};