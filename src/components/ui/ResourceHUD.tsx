import React from 'react';
import { useTycoonStore } from '../../stores/tycoonStore';
import assets from '../../assets.json';

const ResourceHUD: React.FC = () => {
  const yap = useTycoonStore((state) => state.yap);
  
  return (
    <>
      {/* Top Left: Resources */}
      <div className="absolute top-4 left-4 flex items-center gap-3 p-3 bg-black/60 rounded-xl border-2 border-[#4deeea] backdrop-blur-sm pointer-events-none select-none z-40">
        <div className="relative w-12 h-12 flex-shrink-0">
          <img 
            src={assets.ui_icons.icon_yap_1766523343965_1.url} 
            alt="Resource Icon" 
            className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(77,238,234,0.8)]"
          />
        </div>
        
        <div className="flex flex-col">
          <span className="text-[#4deeea] text-xs font-bold uppercase tracking-wider">Total Yap</span>
          <span className="text-white text-3xl font-black leading-none drop-shadow-md font-mono">
            {Math.floor(yap).toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
};

export default ResourceHUD;
