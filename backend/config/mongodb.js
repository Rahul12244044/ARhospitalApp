import mongoose from "mongoose";
import mysql from "mysql2/promise";
const dbConnected=async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
        console.log("mongoose is connected");
    }catch(err){
        console.log(err);
    }
}
// MySQL connection
export const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rahul@12244044",
  database: "prescripto",
});
export default dbConnected;