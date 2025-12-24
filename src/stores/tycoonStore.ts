import { create } from 'zustand';
import { LAND_UPGRADES } from '../constants/landData';

export interface GridObject {
  id: string;
  x: number;
  y: number; // Represents Z in 3D
  type: string;
}

interface TycoonStore {
  // Resources
  yap: number;
  
  // Grid / Map State
  gridWidth: number;
  gridHeight: number;
  maxSize: number;
  
  // Objects on Grid
  placedObjects: GridObject[];

  // Timer
  timerAccumulator: number;

  // Actions
  tick: (deltaTime: number) => void;
  buyLand: (level: number) => boolean; // Returns success/fail
  addObject: (x: number, y: number, type: string) => void;
}

export const useTycoonStore = create<TycoonStore>((set, get) => ({
  yap: 0,
  
  // 1. Data Structure: Grid
  maxSize: 100,
  gridWidth: 1, // Start small based on Land Level 1 (1x1)
  gridHeight: 1,
  
  // Initial Object
  placedObjects: [
    { id: 'init-noob-1', x: 0, y: 0, type: 'char_noob' }
  ],
  
  timerAccumulator: 0,

  tick: (deltaTime: number) =>
    set((state) => {
      let newAccumulator = state.timerAccumulator + deltaTime;
      let newYap = state.yap;
      
      // Auto-Mining: 1 Yap per second per object
      if (newAccumulator >= 1.0) {
        const earnings = state.placedObjects.length * 1;
        newYap += earnings;
        newAccumulator -= 1.0;
      }

      return {
        timerAccumulator: newAccumulator,
        yap: newYap,
      };
    }),

  buyLand: (targetLevel: number) => {
    const state = get();
    const upgrade = LAND_UPGRADES.find(u => u.level === targetLevel);
    
    if (!upgrade) return false;

    // Check cost
    if (state.yap < upgrade.cost) return false;

    // Execute Purchase
    set({
      yap: state.yap - upgrade.cost,
      gridWidth: upgrade.size,
      gridHeight: upgrade.size
    });

    return true;
  },

  addObject: (x, y, type) =>
    set((state) => {
      // Validate bounds
      if (x < 0 || x >= state.gridWidth || y < 0 || y >= state.gridHeight) return state;
      
      const newObj: GridObject = {
        id: `obj-${Date.now()}-${Math.random()}`,
        x,
        y,
        type
      };

      return {
        placedObjects: [...state.placedObjects, newObj]
      };
    }),
}));
