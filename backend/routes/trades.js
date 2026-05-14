const express = require('express');
const router = express.Router();
const Trade = require('../models/Trade');

// @route   POST /api/trades
// @desc    Create a new trade request
router.post('/', async (req, res) => {
  try {
    const { skillId } = req.body;

    const newTrade = new Trade({
      skillId,
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
// @desc    Get all trades (for the dashboard later)
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find().populate('skillId', ['title', 'category']);
    res.json(trades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;