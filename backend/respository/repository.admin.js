import {doctorModel} from "../models/doctorModel.js";
export default class RepositoryAdmin{
    static doctorAddToDatabase=async (doctorObj)=>{
        try{
            const doctorDocument=new doctorModel(doctorObj);
            await doctorDocument.save();
            return doctorDocument;
        }catch(err){
            throw err;
        }
    }
    static findAllDoctors=async ()=>{
        try{
            let allFindDoctors=await doctorModel.find({}).select('-password');
            return allFindDoctors;
        }catch(err){
            throw err;
        }
    }
}