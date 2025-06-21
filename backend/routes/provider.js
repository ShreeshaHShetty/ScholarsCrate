const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');


router.post('/signup', async (req, res) => {
  try {
    const { organizationName, email, phone, password } = req.body;

    const existing = await Provider.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newProvider = new Provider({
      organizationName,
      email,
      phone,
      password
    });

    await newProvider.save();
    res.status(201).json({ message: 'Signup successful! Awaiting admin approval.' });
  } catch (err) {
    console.error("❌ Error during provider signup:", err.message);
    res.status(500).json({ error: 'Server error during signup' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await Provider.findOne({ email });
    if (!provider || provider.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (!provider.isApproved) {
      return res.status(403).json({ error: 'Your account is not yet approved by admin' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error("❌ Error during provider login:", err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});


router.get("/me", async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) return res.status(404).json({ error: "Provider not found." });

    res.json({
      organizationName: provider.organizationName,
      email: provider.email,
      phone: provider.phone
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});


router.get("/profile", async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) return res.status(404).json({ error: "Provider not found." });

    res.json({
      organizationName: provider.organizationName,
      email: provider.email,
      phone: provider.phone
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
});


router.put("/change-password", async (req, res) => {
  const { email } = req.query;
  const { currentPassword, newPassword } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) return res.status(404).json({ error: "Provider not found." });

    if (provider.password !== currentPassword) {
      return res.status(401).json({ error: "Current password is incorrect." });
    }

    provider.password = newPassword;
    await provider.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while changing password." });
  }
});

// Update Provider Profile
router.put("/update", async (req, res) => {
  const { email } = req.query;
  const { organizationName, phone } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const provider = await Provider.findOneAndUpdate(
      { email },
      { organizationName, phone },
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ error: "Provider not found." });
    }

    res.json({ message: "Profile updated.", provider });
  } catch (err) {
    console.error("❌ Error updating provider:", err);
    res.status(500).json({ error: "Server error while updating profile." });
  }
});


router.put("/change-password", async (req, res) => {
  const { email } = req.query;
  const { currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(404).json({ error: "Provider not found." });
    }

    if (provider.password !== currentPassword) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    provider.password = newPassword;
    await provider.save();

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("❌ Error changing password:", err.message);
    res.status(500).json({ error: "Server error while changing password." });
  }
});

module.exports = router;
