🤝 SkillSwap Marketplace: Global Guide
Welcome to the SkillSwap Community Project! This is a MERN stack application designed for peer-to-peer skill trading.

📂 Project Structure
This repository is split into two main parts:

/backend: Node.js & Express server. This handles the MongoDB connection and Skill API routes.

/frontend: React application styled with Tailwind CSS. Includes modular components like SkillCard, SkillForm, and SkillCardSkeleton.

🚀 Quick Start (Team Setup)
To run this project locally, you will need two terminal windows open:

1. Start the Backend
Bash
cd backend
npm install
npm run dev
Note: The server runs on Port 5000. Ensure your local .env reflects this.

2. Start the Frontend
Bash
cd frontend
npm install
npm start
Note: The app will open at http://localhost:3000.

🛠 Tech Stack & Features
Frontend: React, Tailwind CSS (Glassmorphism UI), Axios.

Backend: Node.js, Express, MongoDB.

Key Features:

Skeleton Loading: Professional pulsing states while data is fetching.

Interactive UI: Hover-responsive cards and glassmorphism form design.

Filtering: Search by keyword or filter by categories like Tech, Creative, and Music.

⚠️ Important Notes for Collaborators
Environment Variables: You must create a .env in the frontend/ folder with REACT_APP_API_URL=http://localhost:5000 for the API to connect properly.

API Connection: If you see "XHR error" in the console, check that the backend server is running and the .env port matches.