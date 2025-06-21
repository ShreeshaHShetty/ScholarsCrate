const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Provider', providerSchema);
