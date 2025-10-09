import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import dbConnected from "./config/mongodb.js";
import cloudinaryConnect from "./config/cloudinary.js";
import adminRouter from "./routes/admin.routes.js";
import routerDoctor from "./routes/doctor.routes.js";
import routerUser from "./routes/user.routes.js";
import {mysqlPool} from "./config/mongodb.js";
// config app
const app=express();
// middlewares
app.use(express.json()); // it is body parser
app.use(express.urlencoded({extended:true}));
const allowedOrigins = [
  "https://arhospitalapp.netlify.app",
  "https://arhospitaladminpanel.netlify.app",
  "http://localhost:5173" // for local development
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman or server-to-server requests
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

const PORT=process.env.PORT || 4000;
app.use("/api/admin",adminRouter);
app.use("/api/doctor",routerDoctor);
app.use("/api/user",routerUser);
app.use((err,req,res,next)=>{
    console.log("Error in the err:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ");
    
        return res.json({success:false,message:err.message});
   
})
app.listen(PORT,()=>{
    console.log(`Server is connected to PORT ${PORT}`);
    dbConnected();
    (async () => {
  try {
    const [rows] = await mysqlPool.query("SELECT 1 + 1 AS result");
    console.log("✅ MySQL connected, test result:", rows[0].result);
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();
 
    cloudinaryConnect();
})