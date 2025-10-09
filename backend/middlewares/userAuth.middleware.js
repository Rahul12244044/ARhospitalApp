import jwt from "jsonwebtoken";
const userAuth=(req,res,next)=>{
    try{
        console.log("req.headers: ");
        const {token}=req.headers;

        console.log("req.headers: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(req.headers);
        console.log(token);
        if(!token){
            return res.json({success:false,message:"No Authorization Login Again"})
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        console.log("decodeToken: ");
        console.log(decodeToken);
        req.user=decodeToken;
        next();

    }catch(err){
        res.json({success:false,error:err.message});
    }
}
export default userAuth;