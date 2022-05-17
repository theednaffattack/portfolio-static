import { useReducer } from "react";
import { StateViewer } from "../../src/components/state-viewer";
import { GridAndRooms, GridSquare } from "../../src/create-dungeon";
import { Coords, gameReducer } from "../../src/game-reducer";
import { useEventListener } from "../../src/hooks.use-event-listener";

const action = {
  CHANGE_PLAYER_POSITION: "CHANGE_PLAYER_POSITION",
  CHANGE_ENTITY: "CHANGE_ENTITY",
  CREATE_LEVEL: "CREATE_LEVEL",
  SET_DUNGEON_LEVEL: "SET_DUNGEON_LEVEL",
};

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
      type: "CHANGE_ENTITY";
      payload: { entity: GridSquare; coords: Coords };
    }
  | { type: "CHANGE_PLAYER_POSITION"; payload: Coords }
  | { type: "CREATE_LEVEL"; payload: CreateLevelPayload }
  | { type: "SET_DUNGEON_LEVEL"; payload: number };

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
    dungeonLevel: 1,
  });

  function playerInput(vector: Coords) {
    const [x, y] = state.playerPosition; // get current location
    const [vectorX, vectorY] = vector; // get direction modifier

    const newPosition: Coords = [vectorX + x, vectorY + y]; // define where we're moving to

    const newPlayer = state.entities[y][x];
    const destination = state.entities[y + vectorY][x + vectorX]; // whats in the cell we're heading to

    if (
      destination.type &&
      destination.type !== "enemy" &&
      destination.type !== "boss"
    ) {
      /////////////////////////////here is the place where magic happens//////////////////////////////////

      dispatch({
        type: "CHANGE_ENTITY",
        payload: { entity: { type: "floor" }, coords: [x, y] },
      });

      dispatch({
        type: "CHANGE_ENTITY",
        payload: { entity: newPlayer, coords: newPosition },
      });

      dispatch({
        type: "CHANGE_PLAYER_POSITION",
        payload: newPosition,
      });
      // store.dispatch(changeEntity({ type: "floor" }, [x, y]));
      // store.dispatch(changeEntity(newPlayer, newPosition));
      // store.dispatch(changePlayerPosition(newPosition));
    }
  }

  function keyHandler({ key }: KeyboardEvent) {
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

  const what = state.entities.map((row, rowIndex) =>
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
      cell.opacity = 1;
      if (cell.distanceFromPlayer > 10) {
        cell.opacity = 0;
      }
      return cell;
    })
  );

  const cells = what.map((element, rowIndex) => {
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
    <div className="app">
      <StateViewer data={state} />
      <div className="flex-container">{cells}</div>
    </div>
  );
}
