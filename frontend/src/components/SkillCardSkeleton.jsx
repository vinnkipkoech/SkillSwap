import React from 'react';

const SkillCardSkeleton = () => {
  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 animate-pulse flex flex-col justify-between h-[300px]">
      <div>
        <div className="h-4 w-20 bg-white/20 rounded-full mb-6"></div>
        <div className="h-8 w-3/4 bg-white/20 rounded-xl mb-4"></div>
        <div className="h-4 w-full bg-white/20 rounded-lg mb-2"></div>
        <div className="h-4 w-5/6 bg-white/20 rounded-lg"></div>
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
        <div className="h-6 w-16 bg-white/20 rounded-lg"></div>
        <div className="h-10 w-28 bg-white/20 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SkillCardSkeleton;