import { Weapon } from "./create-entities";

// This weapon registry is essentially a file constant, for now
export interface WeaponRegistry {
  laserPistol: Weapon;
  laserRifle: Weapon;
  plasmaRifle: Weapon;
  electricChainsaw: Weapon;
  railgun: Weapon;
  darkEnergyCannon: Weapon;
  bfg: Weapon;
}

export const weaponRegistry: WeaponRegistry = {
  laserPistol: {
    name: "Laser Pistol",
    damage: 15,
    type: "weapon",
    cost: 0,
  },
  laserRifle: {
    name: "Laser Rifle",
    damage: 19,
    type: "weapon",
    cost: 0,
  },
  plasmaRifle: {
    name: "Plasma Pistol",
    damage: 26,
    type: "weapon",
    cost: 0,
  },
  electricChainsaw: {
    name: "Electric Chainsaw",
    damage: 31,
    type: "weapon",
    cost: 0,
  },
  railgun: {
    name: "Railgun",
    damage: 33,
    type: "weapon",
    cost: 0,
  },
  darkEnergyCannon: {
    name: "Dark Energy Cannon",
    damage: 40,
    type: "weapon",
    cost: 0,
  },
  bfg: {
    name: "B.F.G",
    damage: 43,
    type: "weapon",
    cost: 0,
  },
};
