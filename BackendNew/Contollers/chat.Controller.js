import Chat from "../Models/chat.Model.js";

/**
 * POST /chat/chats
 * Create new empty chat
 */
export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      title: "New Chat",
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
};

/**
 * GET /chat/chats
 */
export const GetUserChat = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

/**
 * DELETE /chat/:ChatId
 */
export const DeleteChat = async (req, res) => {
  try {
    await Chat.findOneAndDelete({
      _id: req.params.ChatId,
      userId: req.user._id,
    });

    res.json({ message: "Chat Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chat" });
  }
};
