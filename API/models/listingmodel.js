const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  regularPrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms:{
    type: Number,
    required: true
  },
  furnished: {
    type: Boolean,
    required: true
  },
  parking: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  offers: {
    type: Boolean,
    required: true
  },
  imageUrls: {
    type: [String],  
    required: true
  },
  userRef: {
    type: String,  
    required: true
  },
  latitude: {
    type: Number 
  },
  longitude: {
    type: Number  
  }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
