import { useReducer } from "react";
import Accordion from "../../src/components/accordion";
import { StateViewer } from "../../src/components/state-viewer";
import { GridAndRooms, GridSquare } from "../../src/create-dungeon";
import { Weapon } from "../../src/create-entities";
import {
  Coords,
  GameActionEnum as GA,
  gameReducer,
} from "../../src/game-reducer";
import { useEventListener } from "../../src/hooks.use-event-listener";
import { potionRegistry as pr } from "../../src/potion-registry";
import {
  weaponRegistry,
  weaponRegistry as wr,
} from "../../src/weapon-registry";

interface Entities {
  entities: GridAndRooms;
  playerPosition: Coords;
}

interface DungeonProps {
  entities: Entities;
  element?: React.MutableRefObject<HTMLDivElement>;
}

export interface GameState {
  dungeonLevel: number;
  entities: Entities["entities"]["grid"];
  playerPosition: Coords;
}

interface CreateLevelPayload {
  entities: GridAndRooms["grid"];
  playerPosition: Coords;
}

export type GameAction =
  | {
      type: GA.CHANGE_ENTITY;
      payload: { entity: GridSquare; coords: Coords };
    }
  | { type: GA.CHANGE_PLAYER_POSITION; payload: Coords }
  | { type: GA.CREATE_LEVEL; payload: CreateLevelPayload }
  | { type: GA.SET_DUNGEON_LEVEL; payload: number };

export default function Dungeon({
  entities: { entities, playerPosition },
}: DungeonProps) {
  const PLAYER_MOVEMENT_KEYS = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];

  const [state, dispatch] = useReducer(gameReducer, {
    entities: entities.grid,
    playerPosition,
    playerInventory: { potions: [], weapons: [], health: 5 },
    dungeonLevel: 1,
  });

  function playerInput(vector: Coords) {
    const [x, y] = state.playerPosition; // get current location
    const [vectorX, vectorY] = vector; // get direction modifier

    const newPosition: Coords = [vectorX + x, vectorY + y]; // define where we're moving to

    const newPlayer = state.entities[y][x];
    // whats in the cell we're heading to
    const destination = state.entities[y + vectorY][x + vectorX];

    if (destination.type === "exit") {
      dispatch({
        type: GA.CREATE_LEVEL,
      });
    }

    if (destination.type === "weapon") {
      const { cost, damage, name, type } = destination;
      dispatch({
        type: GA.PICKUP_ITEM,
        payload: { cost, damage, name, type } as Weapon,
      });
    }

    if (destination.type === "potion") {
      const {
        elixir: { cost, health, name, type },
      } = pr;

      dispatch({
        type: GA.PICKUP_ITEM,
        payload: { cost, health, name, type },
      });
    }

    // Stop player movement at walls (destination.type = 0) and enemies
    if (
      destination.type !== 0 &&
      destination.type !== "enemy" &&
      destination.type !== "boss"
    ) {
      // These should be batched per React docs
      dispatch({
        type: GA.CHANGE_ENTITY,
        payload: { entity: { type: "floor" }, coords: [x, y] },
      });

      dispatch({
        type: GA.CHANGE_ENTITY,
        payload: { entity: newPlayer, coords: newPosition },
      });

      dispatch({
        type: GA.CHANGE_PLAYER_POSITION,
        payload: newPosition,
      });
    }
  }

  function keyHandler({ key }: KeyboardEvent) {
    // stopPropagation();
    if (PLAYER_MOVEMENT_KEYS.includes(String(key))) {
      switch (key) {
        case "ArrowUp":
          playerInput([0, -1]);
          break;

        case "ArrowRight":
          playerInput([1, 0]);
          break;

        case "ArrowLeft":
          playerInput([-1, 0]);
          break;

        case "ArrowDown":
          playerInput([0, 1]);
          break;

        default:
          break;
      }
    }
  }

  useEventListener("keydown", keyHandler);

  const [playerX, playerY] = state.playerPosition;

  const entitiesWithFog = state.entities.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      //we create a new property on each cell that measures the distance from the player
      // let realPlayerX = 0;
      // let realPlayerY = 0;
      // if (playerX) {
      //   realPlayerX = playerX;
      // }
      // if (playerY) {
      //   realPlayerY = playerY;
      // }
      cell.distanceFromPlayer =
        Math.abs(playerY - rowIndex) + Math.abs(playerX - cellIndex);

      //then we will check if distance is > 10 then set opacity to 0
      const black = 0;
      const visible = 1;
      cell.opacity = visible;

      if (cell.distanceFromPlayer > 10) {
        cell.opacity = black;
      }

      return cell;
    })
  );

  const cells = entitiesWithFog.map((element, rowIndex) => {
    return (
      <div className="row" key={rowIndex}>
        {element.map((cell, cellIndex) => {
          const calculateClasses =
            cell.type !== 0 ? "cell " + cell.type : "cell";
          return (
            <div
              className={calculateClasses}
              id={`row-${rowIndex}_col-${cellIndex}`}
              style={{ opacity: cell.opacity }}
              key={cellIndex}
            ></div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="wrapper">
      <div className="app">
        <div className="flex-container">
          <Accordion title="Player Info">
            <StateViewer
              data={{
                dungeonLevel: state.dungeonLevel,
                playerPosition: state.playerPosition,
                inventory: state.playerInventory,
              }}
            />
          </Accordion>
          {cells}
        </div>
      </div>
    </div>
  );
}
