const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true
  },
  fee2425: {
    type: Number,
    required: true
  },
  fee2526: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
