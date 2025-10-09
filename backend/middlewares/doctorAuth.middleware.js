import jwt from "jsonwebtoken";
const doctorAuth=(req,res,next)=>{
    try{
        console.log("req.headers: ");
        const {dtoken}=req.headers;

        console.log("req.headers: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(req.headers);
        console.log(dtoken);
        if(!dtoken){
            return res.json({success:false,message:"No Authorization Login Again"})
        }
        const decodeToken=jwt.verify(dtoken,process.env.JWT_SECRET);
        req.doctor=decodeToken;
        next();

    }catch(err){
        res.json({success:false,error:err.message});
    }
}
export default doctorAuth;