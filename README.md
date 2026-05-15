**SKILLSWAP**

Knowledge Exchange Platform

SkillSwap is a community-driven bartering platform that allows users to trade skills without the need for currency. By exchanging "time as currency," users can learn everything from coding to singing through a structured, safe, and modern interface.

**Technical Highlights**

Architecture: Decoupled Full-Stack (Frontend on Vercel, Backend on Render).

Security: Role-Based Access Control (RBAC) with Admin and User levels.

Persistence: Cloud-based storage via MongoDB Atlas and session persistence with LocalStorage.

Deployment: Fully automated CI/CD pipeline via GitHub.

**Tech Stack**

Frontend: React.js, Tailwind CSS (Glassmorphism UI), Lucide Icons.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Mongoose ODM).

Hosting: Vercel (Frontend) & Render (Backend).

**Key Features**

1. Smart Marketplace

Instant Search: Client-side filtering allows users to find skills instantly without page reloads.

Categorization: One-click browsing for Tech, Creative, Music, Wellness, and Language skills.

Glassmorphic UI: A premium "glass-card" design aesthetic that is fully responsive.

2. The "Trade Handshake" (CRUD Logic)

The platform follows a three-step handshake process to ensure successful trades:

Request (CREATE): A user submits a trade request for a specific skill. Status is set to PENDING.

Process (READ): Instructors view pending requests in their "Trade Activity" dashboard.

Confirm (UPDATE): Instructors accept the trade via a PATCH request, updating the status to SUCCESSFUL.

Moderation (DELETE): Admins have the exclusive ability to remove listings to maintain community guidelines.

3. Role-Based Access Control (RBAC)

User: Can post skills, browse the marketplace, and initiate/accept trades.

Admin: Possesses all user rights plus moderation tools (Delete any listing) and distinct UI badges.

**Installation & Setup**

Prerequisites

Node.js installed

MongoDB Atlas account

Git

**Frontend Setup**

Navigate to the frontend directory.

Install dependencies:

npm install


Create a .env file and add your Vercel/API configurations:

REACT_APP_API_URL=[https://your-backend-render-link.com/api](https://your-backend-render-link.com/api)


Start the development server:

npm start


**Backend Setup**

Navigate to the backend directory.

Install dependencies:

npm install


Create a .env file and add your MongoDB URI:

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000


Start the server:

npm run dev


**The Team**

Vincent

Lincon 

Charity 

** License**

This project is part of a Technical Showcase for the 2026 SkillSwap Community. All rights reserved.
