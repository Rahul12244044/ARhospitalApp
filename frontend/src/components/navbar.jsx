import React,{useState,useContext} from 'react';
import {assets} from "../assets/allAssets.js";
import {NavLink,useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setShowMenu]=useState(false);
    const {aToken,setAToken,userData}=useContext(AppContext);
    const [showDropdownList,setShowDropdownList]=useState(false);
    const logOut=()=>{
        localStorage.removeItem("token");
        setAToken(false);
    }
    return (
        <div className="flex items-center justify-between text-base py-4 mb-5 border-b-1 border-b-gray-400">
            <img onClick={()=>navigate("/")} className="w-44 cursor-pointer" src={assets.logo_icon} alt=""/>
            <ul className="hidden md:flex items-start font-semibold gap-5">
                <NavLink to="/">
                    <li className="py-1">HOME</li>
                    <hr className="outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to="/doctors">
                    <li className="py-1">ALL DOCOTRS</li>
                    <hr className="outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to="/about">
                    <li className="py-1">ABOUT</li>
                    <hr className="outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden"/>
                </NavLink>
                 <NavLink to="/contact">
                    <li className="py-1">CONTACT</li>
                    <hr className="outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden"/>
                </NavLink>
                <li>
                    <button
                        onClick={() => window.open(adminPanelURL, "_blank")}
                        className="bg-grey-100 text-black px-5 py-2 border w-30 rounded-full border border-gray-300 shadow text-xs hover:bg-blue-600 hover:text-white cursor-pointer transition-all"
                    >
                        Admin Panel
                    </button>
                </li>
            </ul>
            <div className="flex items-center gap-4">
                {
                aToken
                ?<div className="flex items-center gap-2 group relative">
                    <img className="w-8 rounded-full" src={userData.image} alt=""/>
                    <img className="w-3" src={assets.dropdown_icon} alt=""/>
                  
                    <div className="absolute top-0 right-0 pt-14 text-gray-600 z-4 font-medium hidden group-hover:block">
                        <div className="min-w-48 flex flex-col rounded bg-stone-100 p-4 gap-4">
                            <p onClick={()=>navigate("/myProfile")} className="hover:text-black cursor-pointer">My Profile</p>
                            <p onClick={()=>navigate("myAppointments")} className="hover:text-black cursor-pointer">My Appointments</p>
                            <p onClick={logOut} className="hover:text-black cursor-pointer">Logout</p>
                        </div>
                    </div>
                    
                </div>
                :<button onClick={()=>navigate("/login")} className="py-1 text-xl bg-blue-500 text-white rounded-full px-8 py-3 m-auto cursor-pointer hidden md:block">
                    Create account
                </button>
                 }
                 <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden cursor-pointer" src={assets.menu_icon} alt=""/>
                 <div className={`${showMenu?"fixed w-full":"h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transiton-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <img onClick={()=>{navigate("/"); setShowMenu(false)}} className="w-37 cursor-pointer" src={assets.logo_icon} alt=""/>
                        <img className="w-7 cursor-pointer" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=""/>
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                        <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setMenu(false)} to="/">HOME</NavLink>
                        <NavLink onClick={()=>setMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
                        <NavLink onClick={()=>setMenu(false)} to="/about">ABOUT</NavLink>
                        <NavLink onClick={()=>setMenu(false)} to="/contact">CONTACT</NavLink>
                         <button
                            onClick={() => { window.open(adminPanelURL, "_blank") }}
                            className="bg-blue-500 text-black px-5 py-2 rounded-full transition-all"
                        >
                            Admin Panel
                        </button>
                    </ul>
                 </div>
            </div>
        </div>
    );
};

export default Navbar;