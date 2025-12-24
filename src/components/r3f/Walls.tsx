import React from 'react';
import { Billboard, Image } from '@react-three/drei';
import assets from '../../assets.json';
import { DEPTH_WALLS } from '../../constants/depth';
import { useTycoonStore } from '../../stores/tycoonStore';

const TILE_SIZE = 2;
const WALL_WIDTH = 2;
const WALL_HEIGHT = 3;
// Anchor so bottom aligns with y=0 (Floor)
const WALL_Y = WALL_HEIGHT / 2;

const Walls = () => {
  const { gridWidth, gridHeight } = useTycoonStore();
  const walls = [];

  // 2. Rendering: Back Walls (Fixed Anchor)
  
  // Left Walls (wall1_right.png) along the edge where y=0 (from x=0 to currentWidth)
  // In 3D, y=0 map coordinate corresponds to z=0 world coordinate.
  // BUT we place them slightly "behind" the tile center to align with the edge?
  // Tile center is at [x*2, 0, y*2]. 
  // Edge is at z = -TILE_SIZE/2 relative to tile center?
  // Let's assume the sprite should stand AT the center of the grid cell for now, 
  // or slightly offset. The sprite usually represents the "Back-Left" and "Back-Right" faces.
  // Standard isometric tile logic: Wall is placed at the "North" and "West" corners.
  
  // For simplicity and alignment with the requested "Fixed Anchor":
  // We place walls at the coordinates of the cells.
  
  // EDGE 1: The row where Map Y = 0 (World Z = 0)
  for (let x = 0; x < gridWidth; x++) {
    walls.push(
      <Billboard 
        key={`wall-back-left-${x}`} 
        position={[x * TILE_SIZE, WALL_Y, 0]} // Fixed at Z=0
      >
        <Image 
          url={assets.sprites.wall1_right_1766523430845_1.url}
          scale={[WALL_WIDTH, WALL_HEIGHT]}
          transparent
          renderOrder={DEPTH_WALLS}
        />
      </Billboard>
    );
  }

  // EDGE 2: The column where Map X = 0 (World X = 0)
  for (let y = 0; y < gridHeight; y++) {
    walls.push(
      <Billboard 
        key={`wall-back-right-${y}`} 
        position={[0, WALL_Y, y * TILE_SIZE]} // Fixed at X=0
      >
        <Image 
          url={assets.sprites.wall1_left_1766523430845_1.url}
          scale={[WALL_WIDTH, WALL_HEIGHT]}
          transparent
          renderOrder={DEPTH_WALLS}
        />
      </Billboard>
    );
  }

  return <group>{walls}</group>;
};

export default Walls;
