import axios from 'axios';

// This matches the port Collaborator 2 set up!
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createSkill = (newSkill) => API.post('/skills', newSkill);
export const fetchSkills = () => API.get('/skills');