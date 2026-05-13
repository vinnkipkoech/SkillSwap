const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: String, default: "Guest User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Skill', skillSchema);