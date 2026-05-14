const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// @route   POST /api/trades
router.post('/', async (req, res) => {
  try {
    const { skillId, skillTitle } = req.body; // Added skillTitle for easier display

    const newTrade = new Trade({
      skillId,
      skillTitle, 
      status: 'pending'
    });

    const trade = await newTrade.save();
    res.json(trade);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find().populate('skillId', ['title', 'category']);
    res.json(trades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// 🆕 @route   PATCH /api/trades/:id
// @desc    Update trade status (Accept/Reject Handshake)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find the trade by ID and update the status field
    const updatedTrade = await Trade.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // This returns the updated document instead of the old one
    );

    if (!updatedTrade) {
      return res.status(404).json({ msg: 'Trade not found' });
    }

    res.json(updatedTrade);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;