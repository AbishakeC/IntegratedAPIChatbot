import Message from "../models/Message.model.js";
import Chat from "../Models/chat.Model.js";
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
    return res.status(500).json({ error: "FAILED_TO_FETCH_MESSAGES" });
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

    // 2️⃣ Update chat title if first message
    const messageCount = await Message.countDocuments({ chat: chatId });

    if (messageCount === 1) {
      await Chat.findByIdAndUpdate(chatId, {
        title: content.slice(0, 30),
      });
    }

    // 3️⃣ FINAL PROMPT (THIS IS THE KEY 🔑)
    const finalPrompt = `
${content}

Format the response in a clean, human-readable ChatGPT-style layout.

Rules:
- Use clear section titles in CAPITAL LETTERS
- Use short paragraphs
- Use bullet points (•) and numbered lists
- Highlight important names and results using CAPITAL words only
- Add spacing between sections
- Do NOT use markdown symbols (*, #, **, etc.)
- make Sure every topic have a line gap
- Keep language simple and easy to scan

Structure:
1. Title line
2. Winner & Podium
3. Key Highlights (bullets)
4. Championship Impact
5. Full Results

Make the output easy to understand at a glance.
`;

    // 4️⃣ Gemini response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    const aiReply = response.text;

    // 5️⃣ Save AI message
    await Message.create({
      chat: chatId,
      role: "assistant",
      content: aiReply,
    });

    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error("Send message error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        error: "GEMINI_QUOTA_EXCEEDED",
        message: "Gemini free-tier quota exceeded. Try again later.",
      });
    }

    return res.status(500).json({ error: "AI response failed" });
  }
};
