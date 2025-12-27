import express from "express";
import User from "../Models/user.Model.js";
import Chat from "../Models/chat.Model.js"
import { protect } from "../Middleware/auth.Middleware.js";

const router = express.Router();

router.get("/profile2", protect, (req, res) => {
  res.status(200).json(req.user);
});

// ✅ Get logged-in user profile
router.get("/profile", protect, async (req, res) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

router.delete('/deleteprofile',protect,async (req,res) =>{
  try{
    const userId = req.user._id;

    await Chat.deleteMany({userId});

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message:"user account deleted succesfully...."
    });

  }catch(error){
       res.status(500).json({message:"error in deleting account....."});
  }
})

// ✅ Get all users (without passwords)
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

export default router;
