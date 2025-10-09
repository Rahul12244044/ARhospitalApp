import {userModel} from "../models/userModel.js";
import {doctorModel} from "../models/doctorModel.js";
import {appointmentModel} from "../models/appointment.model.js";
import {v2 as cloudinary} from "cloudinary";
export default class RepositryUser{
    static registerUser=async (user)=>{
        try{
        const userDoc=new userModel(user);
        await userDoc.save();
        return userDoc;
        }catch(err){
            throw err;
        }
    }
    static findUserEmail=async (email)=>{
        try{
            const userDoc=await userModel.findOne({email});
            return userDoc;
        }catch(err){
            throw err;
        }
    }
    static getUserProfile=async (userId)=>{
        try{
            const userDoc=await userModel.findById(userId).select("-password");
            return userDoc;
        }catch(err){
            throw err;
        }
    }
    static updateUserProfile=async (userId,userObj,imageFile)=>{
        try{
            const {name,phone,address,gender,dob}=userObj;
            const updateProfileUserDoc=await userModel.findByIdAndUpdate(userId,{name,phone,address,gender,dob},{new:true});
            if(imageFile){
                const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
                const imageUrl=imageUpload.secure_url;
                const updateProfileUserDocProfileImage=await userModel.findByIdAndUpdate(userId,{image:imageUrl},{new:true});
                return updateProfileUserDocProfileImage;
            }
            return updateProfileUserDoc;
            

        }catch(err){
            throw err;
        }
    }
    static userAppointments=async (userId)=>{
        try{
            const allUserAppointments=await appointmentModel.find({userId});
            return allUserAppointments;
        }catch(err){
            throw err;
        }
    }
    
}