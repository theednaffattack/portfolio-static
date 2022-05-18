import { createDungeon, GridAndRooms, GridSquare } from "./create-dungeon";
import { createEntities, HealthPotion, Weapon } from "./create-entities";

export interface Entities {
  entities: GridAndRooms;
  playerPosition: Coords;
}

interface CreateLevelPayload {
  entities: GridAndRooms["grid"];
  playerPosition: Coords;
}

export type XCoord = number;
export type YCoord = number;
export type Coords = [XCoord, YCoord];

export type WeaponType = "axe" | "stilleto" | "burining ash" | "Laser Pistol";

interface BaseDetails {
  points: number;
  cost: number;
}

export interface WeaponDetails extends BaseDetails {
  type: WeaponType;
}

export type PotionType = "elixir" | "poison";

export interface PotionDetails extends BaseDetails {
  type: PotionType;
}

export interface GameState {
  dungeonLevel: number;
  entities: Entities["entities"]["grid"];
  playerPosition: Coords;
  playerInventory: {
    potions: HealthPotion[];
    health: number;
    weapons: Weapon[];
  };
}

export enum GameActionEnum {
  CHANGE_ENTITY = "CHANGE_ENTITY",
  CHANGE_PLAYER_POSITION = "CHANGE_PLAYER_POSITION",
  CREATE_LEVEL = "CREATE_LEVEL",
  SET_DUNGEON_LEVEL = "SET_DUNGEON_LEVEL",
  PICKUP_WEAPON = "PICKUP_WEAPON",
  PICKUP_HEALTH_POTION = "PICKUP_HEALTH_POTION",
  PICKUP_ITEM = "PICKUP_ITEM",
}

export type GameAction =
  | {
      type: GameActionEnum.CHANGE_ENTITY;
      payload: { entity: GridSquare; coords: Coords };
    }
  | { type: GameActionEnum.CHANGE_PLAYER_POSITION; payload: Coords }
  | { type: GameActionEnum.CREATE_LEVEL; payload?: CreateLevelPayload }
  | { type: GameActionEnum.SET_DUNGEON_LEVEL; payload: number }
  | { type: GameActionEnum.PICKUP_WEAPON; payload: Weapon }
  | { type: GameActionEnum.PICKUP_HEALTH_POTION; payload: HealthPotion }
  | { type: GameActionEnum.PICKUP_ITEM; payload: HealthPotion | Weapon };

export function gameReducer(
  state: GameState,
  { type, payload }: GameAction
): GameState {
  switch (type) {
    case "CHANGE_ENTITY": {
      // here we use the update function from 'react-addons-update' library
      //basicaly we are just creating an new object(updating) from  the entities array
      //and changing only the entities[y][x]
      const [x, y] = payload.coords;
      const entitiesCopy = [...state.entities];

      entitiesCopy[y][x] = payload.entity;
      return { ...state, entities: entitiesCopy };
    }
    case "CHANGE_PLAYER_POSITION": {
      // when the user will press the 'up' key it will send an action to the Redux store
      // this action will have it's current coords, and starting from that we will
      //generate a new grid with the newly created player position
      return { ...state, playerPosition: payload };
    }
    case GameActionEnum.CREATE_LEVEL: {
      let dungeon = createDungeon();
      let entities = createEntities(dungeon);
      // console.log("VIEW ENTITIES", {
      //   dungeon,
      //   entities: entities.playerPosition,
      // });
      return {
        ...state,
        playerPosition: entities.playerPosition,
        entities: entities.entities.grid,
        dungeonLevel: state.dungeonLevel + 1,
      };
    }

    case GameActionEnum.PICKUP_HEALTH_POTION: {
      const { health, type, name } = payload;
    }

    case GameActionEnum.PICKUP_ITEM: {
      // If it's a weapon there should be properties
      // for "cost" and "damage"
      if ("cost" in payload && "damage" in payload) {
        const { cost, damage, type, name } = payload;
        return {
          ...state,
          playerInventory: {
            ...state.playerInventory,
            weapons: [
              ...state.playerInventory.weapons,
              {
                cost,
                damage,
                type,
                name,
              },
            ],
          },
        };
      }
      if ("health" in payload) {
        const { cost, health, name, type } = payload;
        return {
          ...state,
          playerInventory: {
            ...state.playerInventory,
            potions: [
              ...state.playerInventory.potions,
              { cost, health, name, type },
            ],
          },
        };
      }
      // othewise...
      console.error("PICKUP_ITEM:: This state should be impossible!");
      return state;
    }

    case GameActionEnum.PICKUP_WEAPON: {
      const { type, name } = payload;

      if ("cost" in payload && "damage" in payload) {
        const { cost, damage, type, name } = payload;
        return {
          ...state,
          playerInventory: {
            ...state.playerInventory,
            weapons: [
              ...state.playerInventory.weapons,
              {
                cost,
                damage,
                type,
                name,
              },
            ],
          },
        };
      }
      // If it's not a weapon (this should be impossible), return state
      return state;
    }

    case "SET_DUNGEON_LEVEL":
      return { ...state, dungeonLevel: payload };

    default:
      return state;
  }
}
