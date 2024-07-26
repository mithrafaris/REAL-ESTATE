const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "https://pixabay.com/vectors/group-user-icon-person-personal-2935521/"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
