const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// wll fetch old msg
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Saves the mess
router.post("/", async (req, res) => {
  try {
    const { roomId, senderId, senderRole, message } = req.body;
    const newMsg = new Message({ roomId, senderId, senderRole, message });
    await newMsg.save();
    res.json(newMsg);
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;