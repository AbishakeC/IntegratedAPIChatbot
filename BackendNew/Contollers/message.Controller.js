import Message from "../models/Message.model.js";
import Chat from "../Models/chat.Model.js";   // ✅ MISSING IMPORT (FIX)
import ai from "../Configs/GeminiIntegration.js";

/**
 * GET /message/:chatId
 */
export const GetChatMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: 1 })
      .select("role content");

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return res.status(500).json({
      error: "FAILED_TO_FETCH_MESSAGES",
    });
  }
};

/**
 * POST /chat/:chatId
 */
export const SendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Message content required" });
    }

    // 1️⃣ Save user message
    await Message.create({
      chat: chatId,
      role: "user",
      content,
    });

    // 2️⃣ If first message → update chat title (ChatGPT-style)
    const messageCount = await Message.countDocuments({ chat: chatId });

    if (messageCount === 1) {
      await Chat.findByIdAndUpdate(chatId, {
        title: content.slice(0, 30),
      });
    }

    // 3️⃣ Gemini response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
    });

    const reply = response.text;

    // 4️⃣ Save AI message
    await Message.create({
      chat: chatId,
      role: "assistant",
      content: reply,
    });

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Send message error:", error);

    // ✅ Handle Gemini quota properly
    if (error?.status === 429) {
      return res.status(429).json({
        error: "GEMINI_QUOTA_EXCEEDED",
        message: "Gemini free-tier quota exceeded. Try again later.",
      });
    }

    return res.status(500).json({ error: "AI response failed" });
  }
};
