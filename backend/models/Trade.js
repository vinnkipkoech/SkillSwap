const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  // This links the trade to the specific Skill being requested
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  // We'll use this to manage the workflow of the swap
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  // Information about when this happened
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trade', tradeSchema);