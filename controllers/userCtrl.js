import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import moment from "moment";
import hospitalModel from "../models/hospitalModel.js";
import hospitalAppointmentModel from "../models/hospitalAppointmentModel.js";

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
        const user = await userModel.findById({_id: req.body.userId})
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

const applyDoctorController = async (req, res) => {
    try {
      const newDoctor = await doctorModel({
        ...req.body,
        status: 'pending',
      });
      await newDoctor.save();
  
      const adminUser = await userModel.findOne({ isAdmin: true });
      const Notification = adminUser.Notification;
      Notification.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onclickPath: '/admin/doctors',
        },
      });
      await userModel.findByIdAndUpdate(adminUser._id, { Notification });
  
      res.status(201).send({
        success: true,
        message: 'Registration for Doctor Account is done',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: 'Error while applying as a doctor',
      });
    }
  };
  


const applyHospitalController = async(req, res) => {
    try {
        const newHospital = await hospitalModel({
          ...req.body, 
          status:'pending'
        })
        await newHospital.save();
        
        const adminUser= await userModel.findOne({isAdmin:true})
        const Notification= adminUser.Notification
        Notification.push({
            type:"apply-hospital-request",
            message: `${newHospital.name} has applied for a Hospital Account`,
            data:{
                hospitalId:newHospital._id,
                name: newHospital.name,
                onclickPath:'/admin/hospitals'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {Notification});
        res.status(201).send({
            success:true,
            message:'Registration for Hospital Account is done'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while applying as a Hospital'
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


const getAllDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'})
        res.status(200).send({
            success:true,
            message: "Doctors List fetched Successfully",
            data: doctors
        })     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while fetching doctors",
            error
        })
    }
}


const getAllHospitalsController = async(req, res) => {
    try {
        const hospitals = await hospitalModel.find({status:'approved'})
        res.status(200).send({
            success:true,
            message: "Hospitals List fetched Successfully",
            data: hospitals
        })     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while fetching hospitals",
            error
        })
    }
}


const bookAppointmentController = async (req, res) => {
    try {
      const newAppointment = new appointmentModel({
        ...req.body,
        status: req.body.status || "pending",
      });
      await newAppointment.save();
  
      const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
      user.Notification.push({
        type: "New-Appointment-Request",
        message: `You have a new Appointment Request from ${req.body.userInfo.name}`,
        onclickPath: '/user/appointments'
      });
      await user.save();
  
      res.status(200).send({
        success: true,
        message: "Appointment Booked Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while booking appointment",
        error,
      });
    }
  };
  
  
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = req.body.date;
    const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').format("HH:mm");
    const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').format("HH:mm");
    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: 'Appointment Not Available at this time',
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Appointment Available at this time',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while checking booking availability',
      error,
    });
  }
};

  const bookHospitalAppointmentController = async (req, res) => {
    try {
      const newAppointment = new hospitalAppointmentModel({
        ...req.body,
        status: req.body.status || "pending",
      });
      await newAppointment.save();

      const user = await userModel.findOne({ _id: req.body.hospitalInfo.userId });
      user.Notification.push({
        type: 'New-Hospital-Appointment-Request',
        message: `You have a new Appointment Request from ${req.body.userInfo.name}`,
        onclickPath: '/user/appointments',
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: 'Appointment Booked Successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error while booking hospital appointment',
        error,
      });
    }
  };

const bookingHospitalAvailabilityController = async(req, res) => {
    try {
        const date = req.body.date;
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').format("HH:mm");
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').format("HH:mm");
        const hospitalId= req.body.hospitalId;

        const appointments = await hospitalAppointmentModel.find({
          hospitalId,
          date,
          time:{$gte:fromTime, $lte:toTime}
          })
        if(appointments.length>0){
            return res.status(200).send({
                success:true,
                message: "Appointment Not Available at this time",
            })
        }
        else{
            return res.status(200).send({
                    success:true,
                    message: "Appointment Available at this time",
                })
            }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while checking booking availability",
            error
        })
    }
}


const userAppointmentsController = async(req, res) => {
    try {
        const appointments= await appointmentModel.find({userId: req.body.userId})
        const hospitalAppointments= await hospitalAppointmentModel.find({userId: req.body.userId})
        const mergedAppointments = [...appointments, ...hospitalAppointments];
        res.status(200).send({
            success:true,
            message: "User Appointments fetched Successfully",
            data: mergedAppointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while fetching user appointments",
            error
        })
    }
}


export {loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController, applyHospitalController, getAllHospitalsController, bookHospitalAppointmentController, bookingHospitalAvailabilityController };