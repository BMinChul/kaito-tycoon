# Status

## Active Work
- **Implemented Shop System**:
  - Added `ShopModal` and `ShopLandTab` UI.
  - Replaced "Expand Button" with "SHOP" button in HUD.
  - Defined 10 levels of Land progression (`landData.ts`).
- **New Object System**:
  - `placedObjects` array in store tracks all entities.
  - `GridObjects.tsx` renders sprites at exact grid coordinates.
- **Scalable 100x100 Grid System**:
  - Map dynamically resizes based on `gridWidth`/`gridHeight`.
  - Camera automatically recenters on expansion.

## Recent Activity
- **Refactored Store**:
  - Removed generic `expandServer`.
  - Added `buyLand(level)` with cost validation and sequential unlocking.
- **Updated UI**:
  - `ResourceHUD`: Simplified to only show Resources.
  - `GameSceneUI`: Manages Shop visibility.

## Next Steps
- [ ] **Implement "Items" Tab in Shop**: Allow buying objects (Mining Rigs, Decorations).
- [ ] **Placement System**: Allow clicking grid tiles to place bought objects.
- [ ] **Visual Feedback**: Add floating text (+1 Yap) when mining occurs.
- [ ] **Save/Load**: Persist `gridWidth` and `placedObjects` to local storage.
