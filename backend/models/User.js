const mongoose = require('mongoose');
const {Schema}=mongoose
const UserSchema = new mongoose.Schema({
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
    min: 10
  },
  location: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
