const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

router.post('/upload', async (req, res) => {
  try {
    const data = req.body;
    const newScholarship = new Scholarship(data);
    await newScholarship.save();
    res.status(201).json({ message: "Scholarship uploaded successfully!" });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload scholarship" });
  }
});


router.get("/by-provider", async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const scholarships = await Scholarship.find({ providerEmail: email });
    res.status(200).json(scholarships);
  } catch (err) {
    console.error("❌ Error fetching scholarships:", err.message);
    res.status(500).json({ error: "Server error while fetching scholarships." });
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Scholarship not found." });
    res.json({ message: "Scholarship updated successfully", scholarship: updated });
  } catch (err) {
    console.error("❌ Error updating scholarship:", err.message);
    res.status(500).json({ error: "Server error while updating scholarship." });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Scholarship.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Scholarship not found." });
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting scholarship:", err.message);
    res.status(500).json({ error: "Server error while deleting scholarship." });
  }
});


router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ uploadedAt: -1 }); // Default sort: new to old
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching scholarships" });
  }
});


module.exports = router;
