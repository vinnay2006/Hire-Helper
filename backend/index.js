const Message = require('./models/Message');

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room: ${roomId}`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { roomId, senderId, senderRole, message } = data;
      
      // Save to MongoDB
      const newMsg = new Message({ 
        roomId, 
        senderId, 
        senderRole, 
        message,
        timestamp: new Date()
      });
      await newMsg.save();

      // Send to ALL in room (including sender)
      io.to(roomId).emit("receiveMessage", newMsg);
      
      console.log(`Message sent to room ${roomId}:`, message);

    } catch (err) {
      console.error("Message error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});
