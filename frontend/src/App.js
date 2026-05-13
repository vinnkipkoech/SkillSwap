import React, { useState, useEffect } from 'react';
import { fetchSkills, createSkill } from './api';
import SkillCard from './components/SkillCard';
import SkillForm from './components/SkillForm';
import SkillCardSkeleton from './components/SkillCardSkeleton'; // 🦴 Added for pro loading feel

const CATEGORIES = ["All", "Tech", "Creative", "Music", "Wellness", "Language"];

function App() {
  const [skills, setSkills] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Tech', level: 'Beginner' });

  /* --- API FETCHING --- */
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await fetchSkills();
        setSkills(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        // Subtle delay so the Skeleton Loader actually has time to be seen
        setTimeout(() => setLoading(false), 800);
      }
    };
    getSkills();
  }, []);

  /* --- FORM HANDLING --- */
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createSkill(formData);
      setSkills(prev => [data, ...prev]); 
      setFormData({ title: '', description: '', category: 'Tech', level: 'Beginner' });
      alert("Skill posted! 🚀");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "Check console"}`);
    }
  };

  /* --- FILTER LOGIC --- */
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = (skill.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative font-sans flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')]" />
      <div className="fixed inset-0 -z-10 bg-slate-950/70 backdrop-blur-[2px]" />

      {/* Navigation */}
      <nav className="p-6 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            SKILL<span className="text-indigo-400">SWAP.</span>
          </h1>
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search skills..." 
              className="w-full px-5 py-2.5 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-indigo-400/50 transition-all text-white placeholder-white/40 shadow-inner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </nav>
      
      <main className="flex-grow max-w-6xl mx-auto py-12 px-4 w-full">
        <SkillForm 
          formData={formData} 
          setFormData={setFormData} 
          onSubmit={handleAddSkill} 
          categories={CATEGORIES} 
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-2xl transition-all duration-300 font-bold tracking-tight ${
                activeCategory === cat 
                ? "bg-white text-slate-900 shadow-2xl shadow-white/20 scale-105" 
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            > 
              {cat} 
            </button>
          ))}
        </div>

        {/* Content Section with Skeleton Loading */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            // Render 6 skeletons while loading
            [...Array(6)].map((_, i) => <SkillCardSkeleton key={i} />)
          ) : filteredSkills.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-white/5 backdrop-blur-md border-2 border-dashed border-white/10 rounded-[4rem] animate-in fade-in duration-700">
              <div className="text-6xl mb-6 grayscale opacity-50">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No matches found</h3>
              <p className="text-white/40 mb-8 max-w-xs mx-auto font-medium">
                Try adjusting your search or category filters.
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredSkills.map(skill => (
              <SkillCard 
                key={skill._id} 
                skill={skill} 
                onSelect={setSelectedSkill} 
              />
            ))
          )}
        </div>
      </main>

      {/* Trade Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white p-12 rounded-[3.5rem] max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-2">Trade Request</div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight leading-tight">Swap for {selectedSkill.title}?</h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed font-medium">This will notify the instructor. Make sure you have a skill ready to offer in return!</p>
            <div className="flex flex-col gap-3">
              <button 
                className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100" 
                onClick={() => setSelectedSkill(null)}
              >
                Send Request 🚀
              </button>
              <button 
                className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors" 
                onClick={() => setSelectedSkill(null)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950/40 backdrop-blur-md p-12 text-white/30 text-center text-[10px] font-black uppercase tracking-[0.4em]">
        <p>&copy; 2026 SkillSwap Community Project</p>
      </footer>
    </div>
  );
}

export default App;