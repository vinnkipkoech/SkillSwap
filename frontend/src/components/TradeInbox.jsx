import React from 'react';

// 🆕 Added 'onAccept' to props
const TradeInbox = ({ trades, onAccept }) => {
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
        {trades.map((trade) => {
          const isPending = trade.status === 'pending';
          const isSuccessful = trade.status === 'successful';

          return (
            <div 
              key={trade._id} 
              className={`group backdrop-blur-md border p-6 rounded-[2rem] transition-all duration-500 ${
                isSuccessful 
                ? "bg-emerald-500/10 border-emerald-500/20" 
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  isSuccessful ? "text-emerald-400 bg-emerald-400/10" : "text-indigo-400 bg-indigo-400/10"
                }`}>
                  {trade.status}
                </span>
                <span className="text-white/20 text-[10px] font-medium">
                  {new Date(trade.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-indigo-300 transition-colors">
                {trade.skillTitle || trade.skillId?.title || "Skill Exchange"}
              </h3>
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">
                {trade.skillId?.category || "General"}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {isPending ? (
                  <>
                    <span className="text-white/60 text-[11px] italic">Waiting for instructor...</span>
                    {/* 🆕 Action Button to trigger the 'Update' CRUD operation */}
                    <button 
                      onClick={() => onAccept(trade._id)}
                      className="bg-indigo-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                      Accept Trade
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[11px] font-black uppercase tracking-tighter">Connection Established</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TradeInbox;