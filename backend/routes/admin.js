const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// Get all pending providers
router.get('/pending-providers', async (req, res) => {
  try {
    const pendingProviders = await Provider.find({ isApproved: false });
    res.json(pendingProviders);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching pending providers' });
  }
});

// Approve provider
router.put('/approve-provider/:id', async (req, res) => {
  try {
    const updated = await Provider.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Provider not found' });
    res.json({ message: 'Provider approved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error approving provider' });
  }
});

// Reject provider
router.delete('/reject-provider/:id', async (req, res) => {
  try {
    const deleted = await Provider.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Provider not found' });
    res.json({ message: 'Provider rejected and removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server error rejecting provider' });
  }
});

module.exports = router;
