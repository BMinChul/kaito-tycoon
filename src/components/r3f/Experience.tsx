import { Environment, OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Floor from './Floor';
import Walls from './Walls';
import GridObjects from './GridObjects';
import TycoonManager from '../scene/TycoonManager';
import { useTycoonStore } from '../../stores/tycoonStore';

const CameraRig = () => {
  const { gridWidth, gridHeight } = useTycoonStore();
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    // Update Camera Target to Center of current Grid
    const TILE_SIZE = 2;
    const centerX = ((gridWidth - 1) * TILE_SIZE) / 2;
    const centerZ = ((gridHeight - 1) * TILE_SIZE) / 2;
    
    if (controlsRef.current) {
      controlsRef.current.target.set(centerX, 0, centerZ);
      controlsRef.current.update();
    }
  }, [gridWidth, gridHeight]);

  return (
    <OrbitControls 
      ref={controlsRef}
      makeDefault 
      minZoom={10} 
      maxZoom={50}
      maxPolarAngle={Math.PI / 2.5} // Restrict to keep isometric-ish look
    />
  );
};

const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.7} />
      <Environment preset="sunset" background={false} />
      
      <TycoonManager />
      <CameraRig />
      
      {/* Grid Content */}
      <Floor />
      <Walls />
      <GridObjects />
    </>
  );
};

export default Experience;
