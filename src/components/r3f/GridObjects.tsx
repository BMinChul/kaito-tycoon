import React from 'react';
import { Billboard, Image } from '@react-three/drei';
import { useTycoonStore } from '../../stores/tycoonStore';
import assets from '../../assets.json';

const TILE_SIZE = 2;

const GridObjects = () => {
  const placedObjects = useTycoonStore((state) => state.placedObjects);

  return (
    <group>
      {placedObjects.map((obj) => {
        // Calculate World Position
        // Center of tile (x, y) -> World (x*2, 0, y*2)
        // Sprite needs to stand on floor.
        // Assuming sprite height is approx 2 units (similar to walls/chars).
        // Adjust Y so feet are on floor.
        const worldX = obj.x * TILE_SIZE;
        const worldZ = obj.y * TILE_SIZE;
        const worldY = 1.0; // Half height (assuming height ~2)

        // Determine sprite URL based on type
        // For now, defaulting to 'char_noob' or 'char_whale' based on type logic
        // or just hardcoded for this demo if types aren't fully mapped in assets yet.
        const spriteUrl = obj.type === 'char_whale' 
          ? assets.sprites.char_whale_1766523430845_1.url 
          : assets.sprites.char_noob_1766523430845_1.url;

        return (
          <Billboard
            key={obj.id}
            position={[worldX, worldY, worldZ]}
            lockX={false}
            lockY={false}
            lockZ={false} // Full billboard
          >
            <Image
              url={spriteUrl}
              scale={[2, 2]} // Standard char size
              transparent
            />
          </Billboard>
        );
      })}
    </group>
  );
};

export default GridObjects;
