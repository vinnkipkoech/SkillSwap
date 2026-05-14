import React from 'react';

const getTagColor = (category) => {
  const colors = {
    Tech: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Creative: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Music: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    Wellness: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Language: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  };
  return colors[category] || "text-slate-400 bg-slate-500/10 border-slate-500/20";
};

/**
 * SkillCard Component
 * @param {Object} skill - The skill data from MongoDB.
 * @param {Function} onSelect - Handles the 'Trade Handshake' request.
 * @param {Function} onDelete - Handles the 'Delete' CRUD operation (Admin only).
 * @param {Boolean} isAdmin - Flag to toggle admin moderation tools.
 */
const SkillCard = ({ skill, onSelect, onDelete, isAdmin }) => { 
  return (
    <div className="group relative bg-white/95 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-transparent hover:border-indigo-200 h-full flex flex-col">
      
      {/* 🔐 Admin-Only Moderation Tool */}
      {isAdmin && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering onSelect when deleting
            onDelete(skill._id);
          }}
          className="absolute top-6 right-6 p-2.5 bg-red-50 text-red-400 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white hover:rotate-12 transition-all duration-300 z-20 shadow-sm"
          title="Remove Skill"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      <div className="flex flex-col h-full">
        <div className="mb-4">
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getTagColor(skill.category)}`}>
            {skill.category}
          </span>
          <h3 className="text-2xl font-black mt-4 text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
            {skill.title}
          </h3>
          <p className="text-slate-500 mt-4 line-clamp-3 text-sm leading-relaxed font-medium">
            {skill.description}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Difficulty</span>
            <span className="text-xs font-black text-indigo-500 uppercase tracking-tighter">
              {skill.level || 'Beginner'}
            </span>
          </div>
          
          <button 
            onClick={() => onSelect(skill)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            Request Trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
