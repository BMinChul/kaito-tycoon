import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Image, Text } from '@react-three/drei';
import assets from '../../assets.json';
import { DEPTH_CHARS, DEPTH_UI_TEXT } from '../../constants/depth';
import { useTycoonStore } from '../../stores/tycoonStore';

const Player = () => {
  // We can add floating text logic here later for auto-ticks if needed
  // For now, just static placement
  
  return (
    <group position={[0, 0, 0]}>
      <Billboard position={[0, 1, 0]}>
        <Image 
          url={assets.sprites.char_noob_1766523430845_1.url}
          scale={[2, 2]}
          transparent
          renderOrder={DEPTH_CHARS}
        />
      </Billboard>
    </group>
  );
};

export default Player;
