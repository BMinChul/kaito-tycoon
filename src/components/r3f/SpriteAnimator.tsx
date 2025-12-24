import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface AnimationFrame {
  start: number;
  end: number;
}

interface SpriteSheetConfig {
  url: string;
  imageWidth: number;
  imageHeight: number;
  frameWidth: number;
  frameHeight: number;
  gridRows: number;
  gridCols: number;
  animations: Record<string, AnimationFrame>;
}

interface SpriteAnimatorProps {
  config: SpriteSheetConfig;
  animation: string;
  fps?: number;
  scale?: number;
  billboard?: boolean;
}

const SpriteAnimator: React.FC<SpriteAnimatorProps> = ({
  config,
  animation,
  fps = 8,
  scale = 1,
  billboard = true,
}) => {
  const texture = useTexture(config.url);
  const meshRef = useRef<THREE.Mesh>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const timerRef = useRef(0);

  // Configure texture
  useEffect(() => {
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.repeat.set(1 / config.gridCols, 1 / config.gridRows);
    texture.needsUpdate = true;
  }, [texture, config]);

  // Animation Loop
  useFrame((state, delta) => {
    const anim = config.animations[animation];
    if (!anim) return;

    timerRef.current += delta;
    if (timerRef.current >= 1 / fps) {
      timerRef.current = 0;
      setCurrentFrame((prev) => {
        let next = prev + 1;
        if (next > anim.end) next = anim.start;
        if (next < anim.start) next = anim.start;
        return next;
      });
    }

    if (billboard && meshRef.current) {
        // Simple billboard: look at camera
        meshRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  // Update texture offset based on current frame
  useEffect(() => {
    if (!meshRef.current) return;
    
    const col = currentFrame % config.gridCols;
    const row = Math.floor(currentFrame / config.gridCols);
    
    // In Three.js UVs, (0,0) is bottom-left. 
    // Usually sprite sheets are top-left based.
    // If Row 0 is top, in UV it is 1 - (1/rows).
    
    // Let's assume standard top-to-bottom row ordering from generation tool
    // V coordinate needs to be inverted if the texture is mapped standardly?
    // Let's try standard mapping:
    // offsetX = col / cols
    // offsetY = (rows - 1 - row) / rows
    
    texture.offset.x = col / config.gridCols;
    texture.offset.y = (config.gridRows - 1 - row) / config.gridRows;
    
  }, [currentFrame, config, texture]);

  // Calculate aspect ratio for geometry
  const aspectRatio = config.frameWidth / config.frameHeight;

  return (
    <mesh ref={meshRef} scale={[scale * aspectRatio, scale, 1]} position={[0, scale / 2, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        map={texture} 
        transparent 
        alphaTest={0.5} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default SpriteAnimator;
