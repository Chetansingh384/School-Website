const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sports', 'Events', 'Class Activities', 'Annual Day', 'Other']
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
