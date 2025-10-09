import RepositoryUser from "../respository/repository.user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {mysqlPool} from "../config/mongodb.js";
import {doctorModel} from "../models/doctorModel.js";
import {userModel} from "../models/userModel.js";
import {appointmentModel} from "../models/appointment.model.js";
export default class UserController{
    registerUser=async (req,res,next)=>{
        try{
            const {name,email,password}=req.body;
            if(!name || !email || !password){
                return res.json({success:false,message:"Missing Details."});
            }
            if(password.length<8){
                return res.json({success:false,mesage:"enter strong password."});
            }
            const isUserFound=await RepositoryUser.findUserEmail(email);
            if(isUserFound){
                return res.json({success:false,message:"Email is already registered."});
            }
            const salt=await bcrypt.genSalt(11);
            const hashPassword=await bcrypt.hash(password,salt);
            const user={name,email,password:hashPassword};
            
            const userDoc=await RepositoryUser.registerUser(user);
            console.log("userDoc: ");
            console.log(userDoc);
            const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
            await mysqlPool.execute(query, [name, email, hashPassword]);
            const token=jwt.sign({id:userDoc._id,email:userDoc.email},process.env.JWT_SECRET)
            res.json({success:true,token});
        }catch(err){
            next(err);
        }
    }
    loginUser=async (req,res,next)=>{
        try{
            const {email,password}=req.body;
            const isUserFound=await RepositoryUser.findUserEmail(email);
            if(!isUserFound){
                return res.json({success:false,message:"User does not exist."});
            }
            const isMatch=await bcrypt.compare(password,isUserFound.password);
            if(isMatch){
                const token=jwt.sign({id:isUserFound._id,email},process.env.JWT_SECRET);
                return res.json({success:true,token});
            }else{
                return res.json({success:false,message:"Invalid Credentials."});
            }
        }catch(err){
            next(err);
        }
    }
    getProfile=async (req,res,next)=>{
        try{
            const {id}=req.user;
            console.log("getProfile: ");
            console.log(id);
            const userProfile=await RepositoryUser.getUserProfile(id);
            res.json({success:true,userProfile});
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    updateProfile=async (req,res,next)=>{
        try{
            const {name,phone,dob,gender,address}=req.body;
            const {id}=req.user;
            const imageFile=req.file;
            if(!name || !dob || !phone || !gender){
                return res.json({sucess:false,message:"Missing Details."});
            }
            const userProfileDoc=await RepositoryUser.updateUserProfile(id,{name,phone,dob,gender,address:JSON.parse(address)},imageFile);
            if(userProfileDoc){
                return res.json({success:true,message:"Profile Updated."});
            }else{
                return res.json({success:false,message:"Profile Update Failed."});
            }
        }catch(err){
            next(err);
        }
    }
    bookAppointment=async (req,res,next)=>{
        try{
            const {id}=req.user;
            const {docId,slotDate,slotTime}=req.body;
            const doctData=await doctorModel.findById(docId).select("-password");
            if(!doctData.available){
                return res.json({success:false,message:"Doctor not available."})
            }
            let slots_booked=doctData.slots_booked;
            if(slots_booked[slotDate]){
                if(slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false,message:"Slot not available."});
                }else{
                    slots_booked[slotDate].push(slotTime);
                }
            }else{
                slots_booked[slotDate]=[];
                slots_booked[slotDate].push(slotTime);
            }
            const userData=await userModel.findById(id).select("-password");
            delete doctData.slots_booked;
            const appointmentData={
                userId:id,
                docId,
                userData,
                docData:doctData,
                amount:doctData.fees,
                slotDate,
                slotTime,
                date:Date.now()
            }
            const newAppointment=new appointmentModel(appointmentData);
            await newAppointment.save();
            await doctorModel.findByIdAndUpdate(docId,{slots_booked});
            res.json({success:true,message:"Appointment Booked."});
            

            
        }catch(err){
            next(err);
        }
    }
    listAppointments=async (req,res,next)=>{
        try{
            const {id}=req.user;
            const allAppointments=await RepositoryUser.userAppointments(id);
            console.log("allAppointments: ");
            console.log(allAppointments);
            res.json({success:true,allAppointments});
        }catch(err){
            next(err);
        }
    }
    cancelAppointment=async (req,res,next)=>{
        try{
            const {id}=req.user;
            const {appointmentId}=req.body;
            const appointmentData=await appointmentModel.findById(appointmentId);
            console.log("appointmentData: ");
            console.log(appointmentData);
            if(appointmentData.userId!=id){
                return res.json({success:false,message:"Unauthrized actions."});
            }
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            const {docId,slotDate,slotTime}=appointmentData;
            const docData=await doctorModel.findById(docId);
            let slots_booked=docData.slots_booked;
            slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime);
            await doctorModel.findByIdAndUpdate(docId,{slots_booked});
            res.json({success:true,message:"Appointment Cancelled."});

        }catch(err){
            next(err);
        }
    }
}