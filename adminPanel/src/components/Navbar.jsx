import react,{useContext} from "react";
import {assets} from "../assets/assets.js";
import {AdminContext} from "../context/adminContext.jsx";
import {DoctorContext} from "../context/doctorContext.jsx";
import {useNavigate} from "react-router-dom";
import { FaHospital } from 'react-icons/fa';
const Navbar=()=>{
    const {aToken,setAToken}=useContext(AdminContext);
    const {dToken,setdToken}=useContext(DoctorContext);
    const navigate=useNavigate();
    const logOut=()=>{
        navigate("/");
        aToken && setAToken("");
        aToken && localStorage.removeItem("aToken");
        dToken && setdToken("");
        dToken && localStorage.removeItem("dToken");
    }
    return (
        <>
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200  bg-white">
            <div className="flex items-center">
                  <FaHospital className="text-blue-600 w-10 h-10" /> {/* size 40px */}
                  <span className="ml-2 font-bold text-2xl text-blue-900">
                    ARHospital
                  </span>
                </div>
            <button onClick={logOut} className="bg-blue-500 text-white text-sm px-10 py-2 rounded-full cursor-pointer">Logout</button>
        </div>
        </>
    )
}
export default Navbar;