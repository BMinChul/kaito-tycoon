# Context

## Project Overview
"Yapybara's Alpha Station" is a Web3 Idle Tycoon game.
- **Genre**: Idle / Tycoon / Simulation
- **Theme**: Cyberpunk, Crypto, "Alpha" culture
- **Visual Style**: 32-bit Pixel Art, Isometric view
- **Main Character**: "Yapybara" (A cute Capybara crypto trader)

## Core Gameplay
- **Progression**: Buy larger land plots (1x1 -> 10x10) via the Shop.
- **Management**: Place objects (mining rigs, desks) on the grid to generate "Yap".
- **Economy**: "Yap" is the primary currency used for upgrades.

## Tech Stack
- **Framework**: React + Vite + TypeScript
- **3D Engine**: React Three Fiber (R3F) with `vibe-starter-3d`
- **View**: Orthographic Camera (Isometric projection)
- **State Management**: Zustand
- **UI**: Tailwind CSS + Lucide Icons

## Key Systems
- **TycoonStore**: Manages Currency (Yap), Grid Size, and Object placement.
- **Shop System**: Modal-based store for buying Land and (future) Items.
- **Grid System**: Dynamic R3F rendering of floor/walls based on store state.
