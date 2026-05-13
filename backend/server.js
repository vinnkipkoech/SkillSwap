const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const skillRoutes = require('./routes/skillRoutes');

const app = express();

// 1. MIDDLEWARE
app.use(cors()); 
app.use(express.json()); 

// 2. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB: Connected to SkillSwap Database"))
  .catch(err => console.log("❌ MongoDB: Connection Error ->", err));

// 3. ROUTES
// Base Route
app.get('/', (req, res) => {
  res.send("SkillSwap API is officially online! 🚀");
});

// Skills Routes (This connects the work you did in routes/skillRoutes.js)
app.use('/api/skills', skillRoutes);

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Server heartbeat detected on port ${PORT}`);
});