import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";
const RelatedDoctors = ({docId,speciality}) => {
    const {doctors}=useContext(AppContext);
    const [relDoctors,setRelDoctors]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(doctors.length>0 && speciality){
            setRelDoctors(doctors.filter((elm)=>{
                return elm.speciality===speciality && elm.id!=docId;
            }));
        }
    },[doctors,docId,speciality]);
    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
            <h1 className="text-3xl font-medium text-gray-900">Related Doctors</h1>
            <p className="md:w-1/3 text-sm text-center">Simply browse through our extensive list of trusted doctors</p>
            <div className={`w-full gap-4 gap-y-6 px-3 sm:px-0 
                    ${relDoctors.length === 1
                        ? "w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 justify-start"
                        : "w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 justify-start"}`}>
                {relDoctors.slice(0,5).map((elm,index)=>{
                    return (<>
                    <div onClick={()=>{navigate(`/appointment/${elm._id}`);scrollTo(0,0);}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                        <img className="bg-blue-50" src={elm.image}/>
                    <div className="p-4">
                    <div className={`flex items-center gap-2 text-sm text-center ${elm.available?"text-green-600":"text-red-600"}`}>
                        <p className={`w-2 h-2 ${elm.available?"bg-green-600":"bg-red-500"} rounded-full`}></p><p>{elm.available?"Available":"Not Available"}</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{elm.name}</p>
                    <p className="text-gray-600 text-sm">{elm.speciality}</p>
                    </div>
                    </div>
                    </>)
                })}
            </div>
            <button onClick={()=>{navigate("/doctors"),scrollTo(0,0)}} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer">more</button>
        </div>
    );
};

export default RelatedDoctors;