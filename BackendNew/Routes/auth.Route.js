import express from "express";
import { Login, register } from "../Contollers/auth.Contoller.js";
import { protect } from "../Middleware/auth.Middleware.js";

const router = express.Router();

router.post('/register',register);
router.post('/login',Login);

// app.get('/',protect,(req,res)=>{
//     res.json(req.user);
// });

export default router;