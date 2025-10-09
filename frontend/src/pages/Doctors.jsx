import React,{useContext,useState,useEffect} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import Footer from "../components/footer";
const Doctors = () => {
    const {speciality}=useParams();
    console.log(speciality);
    const {doctors}=useContext(AppContext);
    const [docFilter,setDocFilter]=useState([]);
    const [showFilters,setShowFilters]=useState(false);
    const navigate=useNavigate();
    const applyFilter=()=>{
        if(speciality){
            setDocFilter(doctors.filter((elm,index)=>{
                return elm.speciality==speciality;
            }));
        }else{
            setDocFilter(doctors);
        }
    }
    useEffect(()=>{
        applyFilter();
    },[doctors,speciality]);
    return (
        <div>
            <p className="text-gray-600">Browse through the doctors specialist.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <button onClick={()=>setShowFilters((prev)=>!prev)} className={`py-1 px-3 border rounded text-sm cursor-pointer font-semibold transition-all sm:hidden ${showFilters?'bg-blue-600 text-white':''}`}>Filters</button>
                <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilters?'flex':'hidden sm:flex'}`}>
                    <p onClick={()=>speciality==='General physician'?navigate("/doctors"):navigate("/doctors/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician"?"bg-indigo-100 text-black":""}`}>General physician</p>
                    <p onClick={()=>speciality==='Gynecologist'?navigate("/doctors"):navigate("/doctors/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
                    <p onClick={()=>speciality==='Dermatologist'?navigate("/doctors"):navigate("/doctors/Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
                    <p onClick={()=>speciality==='Pediatricians'?navigate("/doctors"):navigate("/doctors/Pediatricians")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
                    <p onClick={()=>speciality==='Neurologist'?navigate("/doctors"):navigate("/doctors/Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
                    <p onClick={()=>speciality==='Gastroenterologist'?navigate("/doctors"):navigate("/doctors/Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
                </div>
                <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 justify-start">

                    {
                        docFilter.map((elm,index)=>{
                    return (<>
                    <div onClick={()=>navigate(`/appointment/${elm._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                        <img className="bg-blue-50" src={elm.image}/>
                    <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center text-green-600">
                        <p className="w-2 h-2 bg-green-600 rounded-full"></p><p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{elm.name}</p>
                    <p className="text-gray-600 text-sm">{elm.speciality}</p>
                    </div>
                    </div>
                    </>)
                })
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Doctors;