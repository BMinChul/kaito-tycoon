# Structure

## Directory Structure
- `src/components/r3f`: 3D components (Scene, Isometric Map, Characters)
- `src/components/ui`: UI overlays (HUD, Upgrade Menus, Web3 Wallet)
- `src/stores`: Game state (Tycoon logic, Resources, Player data)
- `src/assets`: Asset management

## Architecture
- **GameScene**: Main entry point for R3F canvas.
- **IsometricCamera**: Custom Orthographic camera setup for isometric view.
- **TycoonManager**: Logic for resource generation and ticking.
