import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    },
    title:{
        type:String,
        default:"new Chat"
    }
},
{timestamps:true});

const Chat = mongoose.model("chat",ChatSchema);
export default Chat;