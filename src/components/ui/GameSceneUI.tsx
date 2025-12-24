import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { InputController } from './InputController';
import LoadingScreen from './LoadingScreen';
import ResourceHUD from './ResourceHUD';
import { ShopModal } from './ShopModal';
import { ShoppingCart } from 'lucide-react';

/**
 * Game Scene UI Component
 *
 * This component manages UI overlays for the game scene.
 * It handles loading states and displays appropriate UI elements based on game state.
 */
const GameSceneUI = () => {
  // ⚠️ MUST CHECK: Map physics system ready state
  // Physics paused and loading screen displayed while this value is false
  const { isMapPhysicsReady } = useGameStore();
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <>
      {/* Input Controller - Global input management (keyboard, touch) */}
      <InputController disableJoystick={true} disableKeyboard={true} disabled={true} />
      
      {/* Tycoon HUD */}
      {isMapPhysicsReady && <ResourceHUD />}

      {/* Shop Button (Bottom Right) */}
      {isMapPhysicsReady && (
        <div className="absolute bottom-8 right-8 pointer-events-auto z-40">
          <button
            onClick={() => setIsShopOpen(true)}
            className="
              flex flex-col items-center justify-center w-24 h-24 rounded-2xl
              bg-[#4deeea] hover:bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            "
          >
            <ShoppingCart size={32} className="text-black mb-1" />
            <span className="font-black text-black text-sm tracking-wider">SHOP</span>
          </button>
        </div>
      )}

      {/* Shop Modal */}
      <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />

      {/* Loading Game Scene screen overlay */}
      {!isMapPhysicsReady && <LoadingScreen />}
    </>
  );
};

export default GameSceneUI;
