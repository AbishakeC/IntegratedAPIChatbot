import express from "express";
import { protect } from "../Middleware/auth.Middleware.js";
import { GetChatMessage } from "../Contollers/message.Controller.js";

const router = express.Router();

router.get("/:chatId",protect,GetChatMessage);

export default router;