import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/");
    },
    filename:(req,file,cb)=>{
        const fileName=file.originalname;
        cb(null,fileName);
    }
});
const uploads=multer({storage});
export default uploads;