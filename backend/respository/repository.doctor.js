import {doctorModel} from "../models/doctorModel.js";
export default class RepositoryDoctor{
    static changeAvailabiltyDocotr=async (docId)=>{
        try{
            const doc=await doctorModel.findById({_id:docId});
            await doctorModel.findByIdAndUpdate({_id:docId},{$set:{available:!doc.available}},{new:true});
        }catch(err){
            throw err;
        }
    }
    static allDoctor=async ()=>{
        try{
            const allDoctors=await doctorModel.find({}).select(["-password","-email"]);
            return allDoctors;
        }catch(err){
            throw err;
        }
    }
}