import { useFrame } from '@react-three/fiber';
import { useTycoonStore } from '../../stores/tycoonStore';

const TycoonManager = () => {
  const tick = useTycoonStore((state) => state.tick);

  useFrame((state, delta) => {
    tick(delta);
  });

  return null;
};

export default TycoonManager;
