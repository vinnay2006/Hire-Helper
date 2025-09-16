require("dotenv").config();


const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const crypto=require("crypto");
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
app.post("/order/validate",async(req,res)=>{
const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
const sha=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);
sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
const digest=sha.digest("hex");
if(digest!==razorpay_signature){
  return res.status(400).json({msg:"transaction is not legit!"});
}
res.json({
  msg:"success",
  orderId:razorpay_order_id,
  paymentiId:razorpay_payment_id,
})
})
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
  console.log("Client connected",socket.id);

  // Send current data immediately
  socket.on("sendDetails", (data)=>{
    console.log("Received details:",data);
 
    socket.emit("detailsReceived",{message:"got your data!"});
  });

 

  socket.on("disconnect", () => {
    console.log("Client disconnected",socket.id);
  });
});

// Start the combined server
server.listen(port, () => {
  console.log(`Server (Express + Socket.IO) running on port ${port}`);
  connectToMongo();
});
