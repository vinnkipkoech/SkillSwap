import React from 'react';

const SkillForm = ({ formData, setFormData, onSubmit, categories }) => {
  const inputStyle = "p-4 bg-slate-50 border border-slate-200 rounded-2xl w-full focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder-slate-400 text-slate-800 font-medium";

  return (
    <section className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] mb-16 shadow-2xl max-w-3xl mx-auto border border-white">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-indigo-950 tracking-tighter">Share a Skill</h2>
        <p className="text-slate-500 font-medium">What can you teach the community today?</p>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Skill Title</label>
            <input 
              type="text" 
              placeholder="e.g. Advanced React Hooks" 
              className={inputStyle}
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Category</label>
            <select 
              className={inputStyle}
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {categories.filter(c => c !== "All").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-2">Description</label>
          <textarea 
            placeholder="Tell us about your expertise..." 
            className={`${inputStyle} h-32 resize-none`}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Post to Marketplace</span>
          <span className="text-xl">🚀</span>
        </button>
      </form>
    </section>
  );
};

export default SkillForm;