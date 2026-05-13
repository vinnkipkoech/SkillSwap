/* --- SECTION 1: GLOBAL STRUCTURE & DATA --- */
import React, { useState } from 'react';

// Central Data Store
const INITIAL_SKILLS = [...]; // Your list of skills
const CATEGORIES = ["All", "Tech", "Creative", "Music", "Wellness", "Language"];

function App() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen relative font-sans flex flex-col">
      {/* 🖼️ Fixed Background & Overlays */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url('...')` }} />
      <div className="fixed inset-0 -z-10 bg-slate-900/60 backdrop-blur-[3px]" />

      {/* 🧭 Navbar & Footer */}
      <nav> {/* Navigation Logic */} </nav>
      
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4">
        {/* Children components go here */}
      </main>

      <footer className="bg-slate-950/80 p-12 text-white">
        {/* Footer Logic: Legal, Contact, and Support */}
      </footer>
    </div>
  );
}

/* --- SECTION 2: INTERACTIVE FEED --- */

// Logic for filtering the skills list
const filteredSkills = skills.filter(skill => {
  const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
  return matchesSearch && matchesCategory;
});

{/* 🏷️ Category Filter Tabs */}
<div className="flex gap-2 mb-10">
  {CATEGORIES.map(cat => (
    <button onClick={() => setActiveCategory(cat)}> {cat} </button>
  ))}
</div>

{/* 🃏 The Skill Grid */}
<div className="grid md:grid-cols-2 gap-8">
  {filteredSkills.map(skill => (
    <div className="bg-white/90 p-8 rounded-[2rem]">
      {/* Skill Card Details */}
      <button onClick={() => setSelectedSkill(skill)}>Request Trade</button>
    </div>
  ))}
</div>

{/* 📱 Trade Request Modal */}
{selectedSkill && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Modal Logic */}
  </div>
)}