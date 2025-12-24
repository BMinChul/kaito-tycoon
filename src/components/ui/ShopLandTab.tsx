import React from 'react';
import { useTycoonStore } from '../../stores/tycoonStore';
import { LAND_UPGRADES } from '../../constants/landData';
import { Lock, Check, LayoutGrid } from 'lucide-react';

interface ShopLandTabProps {
  onClose: () => void;
}

export const ShopLandTab: React.FC<ShopLandTabProps> = ({ onClose }) => {
  const yap = useTycoonStore((state) => state.yap);
  const gridWidth = useTycoonStore((state) => state.gridWidth);
  const buyLand = useTycoonStore((state) => state.buyLand);

  // Derive current level from grid size (Simple assumption: Size = Level)
  // Or match against the data to find the current level index
  const currentLevel = LAND_UPGRADES.findIndex(u => u.size === gridWidth) + 1;

  const handleBuy = (level: number) => {
    const success = buyLand(level);
    if (success) {
      onClose(); // Close shop on success
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {LAND_UPGRADES.map((upgrade) => {
        // Status Logic
        const isOwned = upgrade.level <= currentLevel;
        const isNext = upgrade.level === currentLevel + 1;
        const isLocked = upgrade.level > currentLevel + 1;
        const canAfford = yap >= upgrade.cost;

        return (
          <div 
            key={upgrade.level}
            className={`
              flex items-center justify-between p-4 rounded-xl border-2 transition-all
              ${isOwned ? 'bg-gray-900/50 border-gray-700 opacity-60' : ''}
              ${isNext ? 'bg-black/80 border-[#4deeea] shadow-[0_0_15px_rgba(77,238,234,0.3)]' : ''}
              ${isLocked ? 'bg-gray-900 border-gray-800 opacity-50' : ''}
            `}
          >
            {/* Left: Info */}
            <div className="flex items-center gap-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl
                ${isOwned ? 'bg-gray-700 text-gray-400' : isNext ? 'bg-[#4deeea] text-black' : 'bg-gray-800 text-gray-600'}
              `}>
                {isLocked ? <Lock size={20} /> : <LayoutGrid size={24} />}
              </div>
              
              <div className="flex flex-col">
                <span className={`font-bold text-lg ${isNext ? 'text-white' : 'text-gray-400'}`}>
                  {upgrade.name}
                </span>
                <span className="text-sm text-gray-500">
                  Size: {upgrade.size}x{upgrade.size}
                </span>
              </div>
            </div>

            {/* Right: Action */}
            <div className="flex items-center">
              {isOwned ? (
                <div className="flex items-center gap-2 text-[#4deeea] font-bold px-4">
                  <Check size={20} />
                  <span>OWNED</span>
                </div>
              ) : isLocked ? (
                 <div className="flex flex-col items-end px-4">
                   <span className="text-gray-500 font-bold">LOCKED</span>
                   <span className="text-xs text-gray-600">Req. Lvl {upgrade.level - 1}</span>
                 </div>
              ) : (
                <button
                  onClick={() => handleBuy(upgrade.level)}
                  disabled={!canAfford}
                  className={`
                    px-6 py-2 rounded-lg font-bold flex flex-col items-center min-w-[100px]
                    ${canAfford 
                      ? 'bg-[#4deeea] text-black hover:bg-white hover:scale-105 transition-transform' 
                      : 'bg-red-900/50 text-red-400 cursor-not-allowed border border-red-800'}
                  `}
                >
                  <span className="text-sm">BUY</span>
                  <span className="text-xs">{upgrade.cost.toLocaleString()} YAP</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
