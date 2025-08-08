const mongoose = require('mongoose');
const {Schema}=mongoose
const PresentSchema = new mongoose.Schema({
 user:{
  type: mongoose.Schema.Types.ObjectId, 
 ref:"user",
 },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
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

const Present = mongoose.model('Present', PresentSchema);

module.exports = Present;
