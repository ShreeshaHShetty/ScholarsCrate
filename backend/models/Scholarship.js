const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  providerEmail: { type: String, required: true }, 
  scholarshipName: { type: String, required: true },
  description: { type: String, required: true },
  educationLevel: { type: String, required: true },
  marks: { type: Object, required: true }, 
  age: { type: Number },
  gender: { type: String },
  maxIncome: { type: Number },
  caste: { type: String },
  religion: { type: String },
  state: { type: String },
  applyLink: { type: String, required: true },
  deadline: { type: Date, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Scholarship", scholarshipSchema);
