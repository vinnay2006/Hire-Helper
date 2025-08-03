const mongoose = require('mongoose');
const {Schema}=mongoose
const HistorySchema = new mongoose.Schema({
 user:{
  type: mongoose.Schema.Types.ObjectId, 
 ref:"user"
 },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
 
  mobile_no: {
    type: String,
    min: 10
  },
   category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date:{
    type:Date,
    default:Date.now
  },
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
