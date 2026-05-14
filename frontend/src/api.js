import axios from 'axios';

// 🌐 Pull the URL from the .env file. 
const BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api` 
  : 'http://localhost:5000/api';

const API = axios.create({ baseURL: BASE_URL });

// --- Skill Endpoints ---
export const createSkill = (newSkill) => API.post('/skills', newSkill);
export const fetchSkills = () => API.get('/skills');

// --- Trade Endpoints --- 🆕
// These connect to the /api/trades routes we just built in the backend
export const createTrade = (tradeData) => API.post('/trades', tradeData);
export const fetchTrades = () => API.get('/trades');
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

export default API;