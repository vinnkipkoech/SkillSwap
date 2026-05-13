import React, { useState, useEffect } from 'react';
import { fetchSkills, createSkill } from './api'; // 1. Added createSkill import

// Central Constants
const CATEGORIES = ["All", "Tech", "Creative", "Music", "Wellness", "Language"];

function App() {
  /* --- STATE MANAGEMENT --- */
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. State for the New Skill Form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech',
    level: 'Beginner'
  });

  /* --- API FETCHING (READ) --- */
  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await fetchSkills();
        setSkills(data);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };
    getSkills();
  }, []);

  /* --- FORM HANDLING (CREATE) --- */
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      // Send to backend
      const { data } = await createSkill(formData);
      
      // Update UI immediately with the new skill
      setSkills([data, ...skills]); 
      
      // Reset form
      setFormData({ title: '', description: '', category: 'Tech', level: 'Beginner' });
      alert("Skill posted to the marketplace! 🚀");
    } catch (error) {
      console.error("Error posting skill:", error);
      alert("Could not post skill. Is the backend running?");
    }
  };

  /* --- FILTER LOGIC --- */
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative font-sans flex flex-col text-slate-900">
      {/* 🖼️ Fixed Background & Overlays */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] " />
      <div className="fixed inset-0 -z-10 bg-slate-900/70 backdrop-blur-[2px]" />

      {/* 🧭 Navbar */}
      <nav className="p-6 bg-white/10 backdrop-blur-md border-b border-white/20 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">SKILLSWAP.</h1>
          <input 
            type="text" 
            placeholder="Search skills..." 
            className="px-4 py-2 rounded-full bg-white/20 border border-white/30 focus:outline-none focus:bg-white/30 transition shadow-inner"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>
      
      <main className="flex-grow max-w-6xl mx-auto py-12 px-4 w-full">
        
        {/* 🚀 3. NEW: Skill Submission Form Section */}
        <section className="bg-white/95 p-8 rounded-[2.5rem] mb-16 shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-6 text-indigo-900">Share a Skill</h2>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="What can you teach? (e.g. Piano Basics)" 
                className="p-4 bg-slate-100 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <select 
                className="p-4 bg-slate-100 rounded-2xl w-full outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.filter(c => c !== "All").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <textarea 
              placeholder="Describe your expertise..." 
              className="p-4 bg-slate-100 rounded-2xl w-full h-24 outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Post to Feed
            </button>
          </form>
        </section>

        {/* 🏷️ Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === cat 
                ? "bg-white text-slate-900 font-bold shadow-lg" 
                : "bg-white/10 text-white hover:bg-white/20"
              }`}
            > 
              {cat} 
            </button>
          ))}
        </div>

        {/* 🃏 The Skill Grid */}
        {loading ? (
          <p className="text-white text-center animate-pulse">Connecting to heartbeat...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkills.map(skill => (
              <div key={skill._id} className="bg-white/95 p-8 rounded-[2rem] shadow-xl hover:scale-[1.02] transition-transform flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">{skill.category}</span>
                  <h3 className="text-2xl font-bold mt-2">{skill.title}</h3>
                  <p className="text-slate-600 mt-4 line-clamp-3">{skill.description}</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm font-medium px-3 py-1 bg-slate-100 rounded-md">Level: {skill.level || 'All'}</span>
                  <button 
                    onClick={() => setSelectedSkill(skill)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
                  >
                    Request Trade
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredSkills.length === 0 && !loading && (
          <div className="text-center py-20 text-white/60">
            <p className="text-xl">No skills found in this category yet.</p>
          </div>
        )}
      </main>

      {/* 📱 Simple Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-[3rem] max-w-md w-full shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Swap for {selectedSkill.title}?</h2>
            <p className="text-slate-600 mb-8 text-lg">This will send a notification to the teacher to begin a skill trade negotiation.</p>
            <div className="flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition" onClick={() => setSelectedSkill(null)}>Send Request</button>
              <button className="px-6 py-4 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition" onClick={() => setSelectedSkill(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950/80 p-12 text-white/50 text-center text-sm">
        <p>&copy; 2026 SkillSwap Community Project. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}

export default App;