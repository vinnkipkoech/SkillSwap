import axios from 'axios';

// 🌐 Updated for Production
// Replace localhost with your actual Render URL
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://skillswap-4blq.onrender.com/api' 
  : 'http://localhost:5000/api';

const API = axios.create({ baseURL: BASE_URL });

// --- Skill Endpoints ---
export const createSkill = (newSkill) => API.post('/skills', newSkill);
export const fetchSkills = () => API.get('/skills');
export const deleteSkill = (id) => API.delete(`/skills/${id}`); // 🆕 Admin Delete

// --- Trade Endpoints ---
export const createTrade = (tradeData) => API.post('/trades', tradeData);
export const fetchTrades = () => API.get('/trades');

/**
 * 🆕 Update Trade Status
 * Used to finalize the 'Handshake'.
 * @param {string} id - The trade ID from MongoDB
 * @param {string} status - Usually 'successful' or 'rejected'
 */
export const updateTradeStatus = (id, status) => API.patch(`/trades/${id}`, { status });

export default API;