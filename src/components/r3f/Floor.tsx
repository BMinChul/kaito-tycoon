import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import assets from '../../assets.json';
import { DEPTH_TILE } from '../../constants/depth';
import { useTycoonStore } from '../../stores/tycoonStore';

const TILE_SIZE = 2;

const Floor = () => {
  const texture = useTexture(assets.textures.tile_floor_base_1766523385878_1.url);
  const { gridWidth, gridHeight } = useTycoonStore();

  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;

  const tiles = [];
  // 2. Rendering: Loop x: 0 to currentWidth, y: 0 to currentHeight
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      tiles.push(
        <RigidBody key={`floor-${x}-${y}`} type="fixed" colliders="cuboid" position={[x * TILE_SIZE, -0.1, y * TILE_SIZE]}>
          <mesh 
            receiveShadow 
            rotation-x={-Math.PI / 2}
            renderOrder={DEPTH_TILE}
          >
            <planeGeometry args={[TILE_SIZE, TILE_SIZE]} />
            <meshBasicMaterial 
              map={texture} 
              color="#ffffff"
            />
          </mesh>
        </RigidBody>
      );
    }
  }

  return <group>{tiles}</group>;
};

export default Floor;
