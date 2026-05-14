import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { fetchSkills, createSkill, createTrade, fetchTrades, deleteSkill } from './api';
import SkillCard from './components/SkillCard';
import SkillForm from './components/SkillForm';
import SkillCardSkeleton from './components/SkillCardSkeleton';
import TradeInbox from './components/TradeInbox';

const CATEGORIES = ["All", "Tech", "Creative", "Music", "Wellness", "Language"];

function App() {
  const [skills, setSkills] = useState([]); 
  const [trades, setTrades] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Tech', level: 'Beginner' });

  // 🔐 Demo Auth State
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ss_user')) || null);
  const [showLogin, setShowLogin] = useState(false);

  /* --- INITIAL DATA FETCH --- */
  useEffect(() => {
    const loadAppData = async () => {
      try {
        const [skillsRes, tradesRes] = await Promise.all([
          fetchSkills(),
          fetchTrades()
        ]);
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
        setTrades(Array.isArray(tradesRes.data) ? tradesRes.data : []);
      } catch (error) {
        console.error("Data fetch error:", error);
        toast.error("Marketplace sync failed.");
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadAppData();
  }, []);

  /* --- AUTH HANDLERS --- */
  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const mockUser = { name: username, role: 'admin' }; // Hardcoded admin for demo
    setUser(mockUser);
    localStorage.setItem('ss_user', JSON.stringify(mockUser));
    setShowLogin(false);
    toast.success(`Welcome back, ${username}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ss_user');
    toast('Logged out of session', { icon: '👋' });
  };

  /* --- SKILL FORM HANDLING --- */
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to post a skill.");
    if (formData.description.length < 20) return toast.error("Description too short.");

    setIsSubmitting(true);
    const loadingToast = toast.loading('Publishing...');

    try {
      const { data } = await createSkill(formData);
      setSkills(prev => [data, ...prev]); 
      setFormData({ title: '', description: '', category: 'Tech', level: 'Beginner' });
      toast.success('Skill live! 🚀', { id: loadingToast });
    } catch (error) {
      toast.error("Post failed.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* --- ADMIN DELETE HANDLING --- */
  const handleDeleteSkill = async (id) => {
    if (!user) return toast.error("Unauthorized action.");
    if (!window.confirm("Permanent delete?")) return;

    const loadingToast = toast.loading('Deleting...');
    try {
      await deleteSkill(id);
      setSkills(prev => prev.filter(s => s._id !== id));
      toast.success('Removed.', { id: loadingToast });
    } catch (error) {
      toast.error("Delete failed.", { id: loadingToast });
    }
  };

  /* --- TRADE HANDLING --- */
  const handleConfirmTrade = async () => {
    if (!selectedSkill) return;
    const loadingToast = toast.loading('Sending request...');
    try {
      const { data } = await createTrade({ skillId: selectedSkill._id });
      setTrades(prev => [data, ...prev]); 
      toast.success('Request sent! ✉️', { id: loadingToast });
    } catch (error) {
      toast.error("Trade failed.", { id: loadingToast });
    } finally {
      setSelectedSkill(null);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = (skill.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative font-sans flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" gutter={8} />

      <div className="fixed inset-0 -z-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')]" />
      <div className="fixed inset-0 -z-10 bg-slate-950/70 backdrop-blur-[2px]" />

      {/* --- NAVBAR WITH AUTH TOGGLE --- */}
      <nav className="p-6 bg-white/5 backdrop-blur-xl border-b border-white/10 text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter">
            SKILL<span className="text-indigo-400">SWAP.</span>
          </h1>
          
          <div className="flex items-center gap-6">
            <input 
              type="text" 
              placeholder="Search..." 
              className="hidden md:block px-5 py-2 rounded-2xl bg-white/10 border border-white/20 focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-indigo-300">@{user.name}</span>
                <button onClick={handleLogout} className="text-xs uppercase font-black tracking-widest text-white/50 hover:text-red-400 transition-colors">Logout</button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-indigo-600 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">Login</button>
            )}
          </div>
        </div>
      </nav>
      
      <main className="flex-grow max-w-6xl mx-auto py-12 px-4 w-full">
        {/* Only show form to logged-in users */}
        {user ? (
          <SkillForm 
            formData={formData} setFormData={setFormData} 
            onSubmit={handleAddSkill} categories={CATEGORIES}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center mb-12 backdrop-blur-md">
            <h2 className="text-white text-xl font-bold mb-2">Ready to share your expertise?</h2>
            <p className="text-white/50 text-sm mb-6">Login to post skills and start trading with the community.</p>
            <button onClick={() => setShowLogin(true)} className="text-indigo-400 font-black uppercase text-xs tracking-widest border border-indigo-400/30 px-8 py-3 rounded-2xl hover:bg-indigo-400 hover:text-white transition-all">Sign In</button>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-2xl transition-all font-bold ${activeCategory === cat ? "bg-white text-slate-900 scale-105" : "bg-white/5 text-white/70 hover:bg-white/10"}`}
            > {cat} </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [...Array(6)].map((_, i) => <SkillCardSkeleton key={i} />)
          ) : (
            filteredSkills.map(skill => (
              <SkillCard 
                key={skill._id} 
                skill={skill} 
                onSelect={setSelectedSkill} 
                onDelete={handleDeleteSkill}
                isAdmin={user?.role === 'admin'} // 🆕 Pass auth status to card
              />
            ))
          )}
        </div>

        <TradeInbox trades={trades} />
      </main>

      {/* --- LOGIN MODAL --- */}
      {showLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
          <form onSubmit={handleLogin} className="bg-white p-10 rounded-[3rem] w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Welcome.</h2>
            <p className="text-slate-500 mb-8 font-medium">Enter your name to start swapping.</p>
            <input name="username" type="text" placeholder="Username" required className="w-full p-4 bg-slate-100 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-indigo-500 font-bold" />
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Enter Marketplace</button>
            <button type="button" onClick={() => setShowLogin(false)} className="w-full mt-4 text-slate-400 font-bold text-sm">Cancel</button>
          </form>
        </div>
      )}

      {/* --- TRADE MODAL --- */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white p-12 rounded-[3.5rem] max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <h2 className="text-3xl font-black mb-4">Swap for {selectedSkill.title}?</h2>
            <p className="text-slate-500 mb-10 text-lg font-medium">This sends a request to the instructor.</p>
            <button className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 active:scale-95 transition-all" onClick={handleConfirmTrade}>Send Request 🚀</button>
            <button className="w-full py-4 text-slate-400 font-bold" onClick={() => setSelectedSkill(null)}>Cancel</button>
          </div>
        </div>
      )}

      <footer className="bg-slate-950/40 p-12 text-white/30 text-center text-[10px] font-black uppercase tracking-[0.4em]">
        &copy; 2026 SkillSwap Community Project
      </footer>
    </div>
  );
}

export default App;