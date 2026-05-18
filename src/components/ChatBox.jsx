import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://hire-helper-3.onrender.com", {
  transports: ["polling"],
  upgrade: false,
});

const ChatBox = ({ roomId, senderId, role }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!roomId||!senderId){console.log("misssing :",{roomId,senderId});
  return;}
  console.log("chat ready:",{roomId,senderId});

    socket.emit("joinRoom", roomId);

    // Load old messages
    fetch(`https://hire-helper-3.onrender.com/api/chat/${roomId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch(err => console.error("Failed:", err));

    //  Receive ALL messages (own + other person)
    const handleReceive = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [roomId,senderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      senderId,
      senderRole: role,
      message: input,
      timestamp: new Date()
    });

    setInput(""); // ← Clear input only, server echoes message back
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      overflow: "hidden",
      maxWidth: "400px",
      margin: "20px auto"
    }}>
      <div style={{
        background: "#3399cc",
        color: "white",
        padding: "12px",
        fontWeight: "bold"
      }}>
        💬 Chat
      </div>

      <div style={{
        height: "300px",
        overflowY: "auto",
        padding: "12px",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: "40%" }}>
            No messages yet. Say hi! 👋
          </p>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.senderId === senderId ? "flex-end" : "flex-start",
            background: msg.senderId === senderId ? "#3399cc" : "white",
            color: msg.senderId === senderId ? "white" : "#333",
            padding: "8px 12px",
            borderRadius: "16px",
            maxWidth: "70%",
            fontSize: "14px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div>{msg.message}</div>
            <div style={{ fontSize: "10px", opacity: 0.6, marginTop: "4px" }}>
              {msg.timestamp
                ? new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : "Just now"}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: "flex",
        padding: "10px",
        gap: "8px",
        borderTop: "1px solid #eee",
        background: "white"
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary"
          style={{ borderRadius: "20px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;