import express from "express";
import { protect } from "../Middleware/auth.Middleware.js";
import {
  createChat,
  GetUserChat,
  DeleteChat,
} from "../Contollers/chat.Controller.js";
import {
  SendMessage,
  GetChatMessage,
} from "../Contollers/message.Controller.js";

const router = express.Router();

router.post("/chats", protect, createChat);
router.get("/chats", protect, GetUserChat);
router.delete("/:ChatId", protect, DeleteChat);
router.post("/:chatId", protect, SendMessage);
router.get("/message/:chatId", protect, GetChatMessage);

export default router;
