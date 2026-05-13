import axios from 'axios';

// 🌐 Pull the URL from the .env file. 
// If it's missing, it defaults to localhost:5000/api as a safety net.
const BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api` 
  : 'http://localhost:5000/api';

const API = axios.create({ baseURL: BASE_URL });

export const createSkill = (newSkill) => API.post('/skills', newSkill);
export const fetchSkills = () => API.get('/skills');

export default API;