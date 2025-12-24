export interface LandUpgrade {
  level: number;
  size: number;
  name: string;
  cost: number;
}

export const LAND_UPGRADES: LandUpgrade[] = [
  { level: 1, size: 1, name: "Starter Plot", cost: 0 },
  { level: 2, size: 2, name: "Tiny Room", cost: 100 },
  { level: 3, size: 3, name: "Small Office", cost: 500 },
  { level: 4, size: 4, name: "Garage Startup", cost: 2000 },
  { level: 5, size: 5, name: "Server Room", cost: 8000 },
  { level: 6, size: 6, name: "Tech Incubator", cost: 25000 },
  { level: 7, size: 7, name: "Crypto Farm", cost: 75000 },
  { level: 8, size: 8, name: "Data Center", cost: 200000 },
  { level: 9, size: 9, name: "Alpha Headquarters", cost: 500000 },
  { level: 10, size: 10, name: "Verse Monolith", cost: 1000000 },
];
