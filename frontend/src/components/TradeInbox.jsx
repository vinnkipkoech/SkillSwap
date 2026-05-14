import React from 'react';

const TradeInbox = ({ trades }) => {
  if (!trades || trades.length === 0) return null;

  return (
    <section className="mt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-grow bg-white/10"></div>
        <h2 className="text-white text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          Trade Activity
        </h2>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div 
            key={trade._id} 
            className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">
                {trade.status}
              </span>
              <span className="text-white/20 text-[10px] font-medium">
                {new Date(trade.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">
              {trade.skillId?.title || "Unknown Skill"}
            </h3>
            <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">
              {trade.skillId?.category || "General"}
            </p>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-white/60 text-[11px] italic">Waiting for instructor...</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                <div className="w-1 h-1 rounded-full bg-indigo-500/50"></div>
                <div className="w-1 h-1 rounded-full bg-indigo-500/20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradeInbox;