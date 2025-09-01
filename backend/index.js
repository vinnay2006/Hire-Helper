require("dotenv").config();


const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const Razorpay=require("razorpay");


// Initialize express
const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.post('/order',async (req,res)=>{
  try {
     const razorpay=new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET,
  });
     const options = req.body;
  const order=await razorpay.orders.create(options);
 
  if(!order){
    return res.status(500).send("ERROR");
  }
   res.json(order); 
  } catch (error) {
    console.log(error);
   res.status(500).json({ error: error.message });
  }


});
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
