const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  age: { type: Number, required: true },
  education: { type: String, required: true },
  gender: { type: String, required: true },
  income: { type: Number, required: true },
  caste: { type: String, required: true },
  religion: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  marks: { type: Object, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
