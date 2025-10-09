import React,{useContext,useState,useEffect} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {AppContext} from "../context/AppContext";
const MyAppointments = () => {
    const {aToken,getDoctorsData}=useContext(AppContext);
    const [appointments,setAppointments]=useState([]);
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul",,"Aug","Sep","Oct","Nov","Dec"];
    const slotDateFormat=(slotDate)=>{
        const dateArray=slotDate.split("-");
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
    }
    const cancelAppointment=async (appointmentId)=>{
        try{
            console.log(appointmentId);
            const {data}=await axios.post("http://localhost:4000/api/user/cancel-appointment",{appointmentId},{headers:{token:aToken}});
            if(data.success){
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            }else{
                toast.error(data.message);
            }


        }catch(err){
            toast.error(err.message);
        }
    }
    const getUserAppointments=async ()=>{
        try{
            const {data}=await axios.get("http://localhost:4000/api/user/appointments",{headers:{token:aToken}});
            if(data.success){
                setAppointments(data.allAppointments.reverse());
                console.log("allAppointments @@@@@@@@@@@@@@@@@@@@@");
                console.log(data.allAppointments);
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    const appointmentRozarpay=(appointmentId)=>{
        try{
            toast.error("Feature is Disable.")
        }catch(err){
            toast.error(err.message);
        }
    }
    useEffect(()=>{
        if(aToken){
            getUserAppointments();
        }
    },[aToken])
    return appointments && (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-zinc-200">My appointments</p>
            <div>
                {appointments.map((item,index)=>{
                    return (
                    <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-zinc-200">
                        <div>
                            <img className="w-32 bg-indigo-50" src={item.docData.image} atl=""/>
                        </div>
                        <div className="flex-1 text-sm text-zinc-700">
                            <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className="text-neutral-700 font-medium mt-1">Address:</p>
                            <p className="text-xsm">{item.docData.address.line1}</p>
                            <p className="text-xsm">{item.docData.address.line2}</p>
                            <p className="text-xs mt-1"><span className="text-sm text-neutrall-700 font-medium">Date & Time:</span>&nbsp;{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className="flex flex-col gap-2 justify-end">
                            {!item.cancelled && !item.isCompleted && <button onClick={()=>appointmentRozarpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer">Pay Online</button>}
                            {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button  className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button>}
                            {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
                        </div>
                        
                    </div>)
                })}
            </div>
        </div>
    );
};

export default MyAppointments;