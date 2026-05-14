import React from 'react';
import { Link } from 'react-router-dom';

const Guidelines = () => {
  return (
    /* Main container ensures the page is centered and readable */
    <div className="max-w-4xl mx-auto my-12 px-4">
      {/* White background container:
          - bg-white: adds the solid white background
          - p-10: adds internal spacing
          - rounded-[3rem]: matches your app's rounded aesthetic 
          - shadow-2xl: adds depth to separate it from the background
      */}
      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl animate-in fade-in duration-700">
        <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900">
          Community Guidelines
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed">
          SkillSwap is built on trust and mutual support. To keep our marketplace safe and constructive, all members must follow these rules: 
        </p>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">1. Purely Skill-for-Skill</h3>
            <p className="text-lg text-slate-700">
              No money changes hands on SkillSwap. We return to the roots of community support by trading expertise directly. 
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">2. Respectful Exchanges</h3>
            <p className="text-lg text-slate-700">
              Be professional and polite. Our goal is to bridge the gap between those with valuable skills and those eager to learn.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">3. Fair Proposing</h3>
            <p className="text-lg text-slate-700">
              When sending an Exchange Request, propose a return skill that creates a fair and balanced trade for both parties. 
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-indigo-600 mb-2">4. Reputation & Trust</h3>
            <p className="text-lg text-slate-700">
              Always rate and review your partner after a session. This helps the community verify the quality of help offered. 
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
            Admins may remove listings that violate these rules. 
          </p>
          <Link 
            to="/" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;