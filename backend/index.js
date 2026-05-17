require("dotenv").config();

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const crypto = require("crypto");
const Razorpay = require("razorpay");
const http = require("http");
const { Server } = require("socket.io"); // ← Step 1: Import

const app = express();
const port = process.env.PORT || process.env.port || 5000;

// CORS
app.use(cors({
  origin: [
    "https://hire-helper-t5k9.vercel.app",
    "https://hire-helper-t5k9-ik8jqvuo9-vinay-kumars-projects-24578a9e.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "auth-token"],
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! Vinay is on fire');
});

app.post('/order', async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("ERROR");
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "transaction is not legit!" });
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/HelperAuth', require('./routes/HelperAuth'));
app.use('/api/chat', require('./routes/chat'));

// ← Step 2: Create server AFTER routes
const server = http.createServer(app);

// ← Step 3: Create io AFTER server
const io = new Server(server, {
  cors: {
    origin: [
      "https://hire-helper-t5k9.vercel.app",
      "https://hire-helper-t5k9-ik8jqvuo9-vinay-kumars-projects-24578a9e.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["polling", "websocket"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

const Message = require('./models/Message');

// ← Step 4: Use io AFTER it is defined
io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Joined room: ${roomId}`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { roomId, senderId, senderRole, message } = data;
      const newMsg = new Message({
        roomId,
        senderId,
        senderRole,
        message,
        timestamp: new Date()
      });
      await newMsg.save();

      // ✅ Send to ALL in room
      io.to(roomId).emit("receiveMessage", newMsg);
      console.log(`Message in room ${roomId}:`, message);

    } catch (err) {
      console.error("Message error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

// ← Step 5: Start server LAST
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToMongo();
});
