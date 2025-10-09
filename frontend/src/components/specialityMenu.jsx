import React from 'react';
import {speciality} from "../assets/allAssets.js";
import {Link} from "react-router-dom";
const SpecialityMenu = () => {
    return (
        <div className="flex flex-col  items-center gap-4 py-16 text-gray-800" id="speciality">
            <h1 className="text-3xl font-medium">Find by Speciality</h1>
            <p className="sm:w-1/3 text-sm text-center">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className="flex gap-4 sm:justify-center pt-5 w-full overflow-scroll">
                {speciality.map((elm,index)=>{
                     return (
                     <Link onClick={()=>scrollTo(0,0)} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" key={index} to={`/doctors/${elm.speciality}`}>
                        <img className="w-16 sm:w-24 mb-2" src={elm.image} alt=""/>
                        <p>{elm.speciality}</p>
                    </Link>)
                })}
            </div>
           
        </div>
    );
};

export default SpecialityMenu;