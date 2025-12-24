import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { ShopLandTab } from './ShopLandTab';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'LAND' | 'ITEMS';

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('LAND');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0a0f1e] border-2 border-[#4deeea] rounded-2xl shadow-[0_0_50px_rgba(77,238,234,0.2)] flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-[#4deeea]" size={28} />
            <h2 className="text-2xl font-black text-white tracking-wider">MARKETPLACE</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('LAND')}
            className={`flex-1 py-4 font-bold text-sm tracking-widest uppercase transition-colors
              ${activeTab === 'LAND' ? 'bg-[#4deeea]/10 text-[#4deeea] border-b-2 border-[#4deeea]' : 'text-gray-500 hover:text-gray-300'}
            `}
          >
            Real Estate (Land)
          </button>
          <button
             disabled
             className="flex-1 py-4 font-bold text-sm tracking-widest uppercase text-gray-700 cursor-not-allowed flex items-center justify-center gap-2"
          >
            Equipment (Coming Soon)
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'LAND' && <ShopLandTab onClose={onClose} />}
        </div>

      </div>
    </div>
  );
};
