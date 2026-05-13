const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE (The helpers)
app.use(cors()); // Allows frontend to talk to backend
app.use(express.json()); // Allows server to read JSON data sent in requests

// 2. DATABASE CONNECTION (The connection to the cloud)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB: Connected to SkillSwap Database"))
  .catch(err => console.log("❌ MongoDB: Connection Error ->", err));

// 3. BASE ROUTE (The "Hello World")
app.get('/', (req, res) => {
  res.send("SkillSwap API is officially online! 🚀");
});

// 4. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Server heartbeat detected on port ${PORT}`);
});