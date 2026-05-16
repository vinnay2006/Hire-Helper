import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://hire-helper-3.onrender.com", {
  transports: ["polling"],  //  it wll ty to Frce poling & skip WebSoket
  upgrade: false,          
});

const ChatBox = ({ userId, helperId, role }) => {
  const roomId = [userId, helperId].sort().join("_");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    // its for loading the old messages 
    fetch(`https://hire-helper-3.onrender.com/api/chat/${roomId}`)
      .then(res => res.json())
      .then(data => setMessages(data));

    // it will listen for new messages
    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("sendMessage", {
      roomId,
      senderId: userId,
      senderRole: role,
      message: input
    });
    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "12px", 
                  overflow: "hidden", maxWidth: "400px", margin: "20px auto" }}>
      
      <div style={{ background: "#3399cc", color: "white", padding: "12px", fontWeight: "bold" }}>
        💬 Chat
      </div>

      <div style={{ height: "300px", overflowY: "auto", padding: "12px", 
                    background: "#f9f9f9", display: "flex", flexDirection: "column", gap: "8px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.senderId === userId ? "flex-end" : "flex-start",
            background: msg.senderId === userId ? "#3399cc" : "white",
            color: msg.senderId === userId ? "white" : "#333",
            padding: "8px 12px",
            borderRadius: "16px",
            maxWidth: "70%",
            fontSize: "14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            {msg.message}
            <div style={{ fontSize: "10px", opacity: 0.6, marginTop: "4px" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", padding: "10px", gap: "8px", borderTop: "1px solid #eee" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "8px 12px", borderRadius: "20px", 
                   border: "1px solid #ddd", outline: "none" }}
        />
        <button onClick={sendMessage} className="btn btn-primary" 
                style={{ borderRadius: "20px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;