import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDb = async ()=>{
     try{
        await mongoose.connect(process.env.Mongodb_URI);
         console.log("MONGODB-CONNECTED-SUCESSFULLY.......")
     }
     catch(error){
         return console.log("errror in connection......")
     }
}

export default ConnectDb;