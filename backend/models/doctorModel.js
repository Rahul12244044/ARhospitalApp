import mongoose from "mongoose";
const doctorSchema=new mongoose.Schema({
    name:{type:String,required:[true,"name is required"]},
    email:{type:String,required:[true,"email is required"],unique:true,validate:{
        validator:function(value){
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        },
        message:"Please enter valid email"
    }},
    password:{type:String,required:[true,"password is required"]},
    image:{type:String,required:[true,"image is required"]},
    speciality:{type:String,required:[true,"speciality is required"]},
    degree:{type:String,required:[true,"degree is required"]},
    experience:{type:String,required:[true,"experience is required"]},
    about:{type:String,required:[true,"about is required"]},
    available:{type:Boolean,default:true},
    fees:{type:Number,required:[true,"fees is requred"]},
    address:{type:Object,required:[true,"address is required"]},
    date:{type:Number,required:[true,"date is required"]},
    slots_booked:{type:Object,default:{}}

},{minimize:false});// minimize false means we are storing object as default empty
export const doctorModel=mongoose.model("Doctors",doctorSchema);
export default doctorSchema;