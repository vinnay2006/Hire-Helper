const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Initialize express
const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! Vinay is on fire');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/HelperAuth', require('./routes/HelperAuth'));

// Create HTTP server from express app
const http = require("http");
const server = http.createServer(app);

// Initialize Socket.IO on the same server
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

// Example data
let data = { value: "Initial Data" };

 // Example: simulate data change every 1s
  setInterval(() => {
     data.value = "Updated at " + new Date().toLocaleTimeString();
    io.emit("dataUpdate", data);  
  }, 1000);
// Socket.IO logic
io.on("connection", (socket) => {
  console.log("Client connected");

  // Send current data immediately
  socket.emit("dataUpdate", data);

 

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the combined server
server.listen(port, () => {
  console.log(`Server (Express + Socket.IO) running on port ${port}`);
  connectToMongo();
});
