import { useReducer } from "react";
import { gameReducer } from "../game-reducer";
import { useEventListener } from "../hooks.use-event-listener";
import { StateViewer } from "./state-viewer";
import type { Coords, Entities } from "../game-reducer";

const action = {
  CHANGE_PLAYER_POSITION: "CHANGE_PLAYER_POSITION",
  CHANGE_ENTITY: "CHANGE_ENTITY",
  CREATE_LEVEL: "CREATE_LEVEL",
  SET_DUNGEON_LEVEL: "SET_DUNGEON_LEVEL",
};

interface DungeonProps {
  entities: Entities;
}

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
    playerInput: ()=>void,
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
      // @TODO: reset player type after trampling (currently sets to "floor")
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
      // Create a new property on each cell that measures the distance from the player
      cell.distanceFromPlayer =
        Math.abs(playerY - rowIndex) + Math.abs(playerX - cellIndex);

      // Set fog -- check if distance is > 10 then set opacity to 0
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
      <StateViewer data={state.playerPosition} />
      <div className="flex-container">{cells}</div>
    </div>
  );
}
