import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // id:mongoose.Schema.Types.ObjectId,
        name:{type:String,require:true,trim:true},
        email:{type:String,require:true,unique:true,lowercase:true,trim:true},
        password:{type:String,require:true,minlength:6},
        // createdAt:{required:true}
    },
    {timestamps:true}
);
const User = mongoose.model("User",userSchema);

export default User;