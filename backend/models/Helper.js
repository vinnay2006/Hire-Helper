const mongoose = require('mongoose');
const {Schema}=mongoose
const HelperSchema = new mongoose.Schema({
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
  password: {
    type: String,
    min: 6,
  },
  mobile_no: {
    type: String,
    min: 10,
    required:true,
  },
  location: {
    type: String,
    required: true
  },
   category: {
    type: String,
    required: true,
    trim: true,
  },
    experience: {
    type: String,
    required: true,
  default:"0 ",
  },
   charges: {
    type: String,
    required: true,
  default:"0 ",
  },
  liveLocation:{
    latitude:{type:Number,defaults:0},
    longitude:{type:Number,default:0},
    updateAt:{type:Date,default:Date.now}
  },
  available: {
    type: Boolean,
    default: false,
  }
 

});

const Helper = mongoose.model('Helper', HelperSchema);

module.exports = Helper;