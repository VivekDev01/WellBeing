import userModel from "../models/userModel"
import bcrypt from "bcryptjs";

//register callback
const registerController= async(req, res)=>{
    try {
        const existinUser= await userModel.findOne({email:req.body.email})
        if(existinUser){
            return res.status(200).send({message:'User already exist', success:false})
        }
        const password= req.body.password;
        const confirmPassword= req.body.confirmPassword; 

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
}

const loginController = () =>{}



module.exports= {loginController, registerController};