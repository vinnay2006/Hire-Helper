const connectToMongo=require('./db');
const express = require('express');
const cors = require('cors');


connectToMongo();

const app = express()
const port = 5000
app.use(cors());

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World! Vinay is on fire')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/HelperAuth',require('./routes/HelperAuth'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})