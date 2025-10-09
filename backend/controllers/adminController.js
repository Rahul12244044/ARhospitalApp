import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import RepositoryAdmin from "../respository/repository.admin.js";
import {appointmentModel} from "../models/appointment.model.js";
import {doctorModel} from "../models/doctorModel.js";
import {userModel} from "../models/userModel.js";
export default class AdminController{
    doctorAdd=async (req,res,next)=>{
        try{
            const {name,email,password,speciality,degree,experience,about,available,fees,address}=req.body;
            console.log("req.body: ");
            console.log(req.body);
            const imageFile=req.file;
            console.log("req.file: ");
            console.log(req.file);
            const salt=await bcrypt.genSalt(11);
            const hashPassword=await bcrypt.hash(password,salt);
            console.log({name,email,hashPassword,speciality,degree,experience,about,available,fees,address},{imageFile});
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
            const imageUrl=imageUpload.secure_url;
            console.log("imageUpload: ");
            console.log(imageUpload);
            const doctorObj={
                name,
                email,
                password:hashPassword,
                image:imageUrl,
                speciality,
                degree,
                experience,
                about,
                available,
                fees,
                address:JSON.parse(address),
                date:Date.now()
            }
            const docDocument=await RepositoryAdmin.doctorAddToDatabase(doctorObj);
            return res.json({success:true,message:"Doctor added successfully",doctor:docDocument})
            
        }catch(err){
            console.log("in the controller of the add doctor:@@@@@@@@@@@@@@@@@@@@@@@ ");
            console.log(err);
            next(err);
        }
    }
    loginAdmin=(req,res,next)=>{
        try{
            const {email,password}=req.body;
            if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
                const token=jwt.sign({email,password},process.env.JWT_SECRET);
                return res.json({success:true,message:"Login Successfull.",token});   
            }else{
                return res.json({success:false,message:"Invalid Credentails"});
            }
        }catch(err){
            console.log(err);
            res.json({success:false,error:err.message})
        }
    }
    allDoctors=async (req,res,next)=>{
        try{
            const allDoctors=await RepositoryAdmin.findAllDoctors();
            return res.json({success:true,allDoctors});
        }catch(err){
            console.log(err);
            next(err);
        }
    }
    adminAppointment=async (req,res,next)=>{
        try{
            const allAppointments=await appointmentModel.find({});
            res.json({success:true,allAppointments});
        }catch(err){
            next(err);
        }
    }
    adminCancelAppointment=async (req,res,next)=>{
            try{
                const {appointmentId}=req.body;
                const appointmentData=await appointmentModel.findById(appointmentId);
                console.log("appointmentData: ");
                console.log(appointmentData);
                
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
    adminDashborard=async (req,res,next)=>{
        try{
            const doctors=await doctorModel.find({});
            const users=await userModel.find({});
            const appointments=await appointmentModel.find({});
            const dashData={
                doctors:doctors.length,
                patients:users.length,
                appointments:appointments.length,
                latestAppointment:appointments.reverse().slice(0,5)
            }
            res.json({success:true,dashData});
        }catch(err){
            next(err);
        }
    }
}