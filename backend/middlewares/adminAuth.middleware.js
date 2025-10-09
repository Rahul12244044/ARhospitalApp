import jwt from "jsonwebtoken";
const adminAuth=(req,res,next)=>{
    try{
        console.log("req.headers: ");
        const {atoken}=req.headers;

        console.log("req.headers: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(req.headers);
        console.log(atoken);
        if(!atoken){
            return res.json({success:false,message:"No Authorization Login Again"})
        }
        const decodeToken=jwt.verify(atoken,process.env.JWT_SECRET);
        if(decodeToken.email!==process.env.ADMIN_EMAIL && decodeToken.password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"No Authorization Login Again"})
        }
        next();

    }catch(err){
        res.json({success:false,error:err.message});
    }
}
export default adminAuth;