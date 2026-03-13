const mongoose = require('mongoose');

const principalMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('PrincipalMessage', principalMessageSchema);
