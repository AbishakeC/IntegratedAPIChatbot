// routes/user.route.js
import express from "express";
import User from "../Models/user.Model.js";
import { protect } from "../Middleware/auth.Middleware.js";

const router = express.Router();

router.get("/users", protect, async (req, res) => {
  const users = await User.findAll().select("-password");
  console.log(users);
  res.json(users);
});

export default router;
