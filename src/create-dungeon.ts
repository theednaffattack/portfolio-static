import { growMap } from "./grow-map";
import { placeCells } from "./place-cells";
import { randomInteger } from "./random-integer";

export type Room = Record<string, any>;

export interface GridSettings {
  GRID_HEIGHT: number;
  GRID_WIDTH: number;
  MAX_ROOMS: number;
  ROOM_SIZE_RANGE: [number, number];
}
export type EntityDesignation =
  | 0
  | "boss"
  | "door"
  | "enemy"
  | "exit"
  | "floor"
  | "player"
  | "potion"
  | "weapon";

export interface GridSquare {
  type: EntityDesignation;
  id?: string;
  opacity?: number;
  distanceFromPlayer?: number;
  cost?: number;
  name?: string;
  damage?: number;
}

export interface GridAndRooms {
  grid: GridSquare[][];
  placedRooms: Room[];
}

// Add settings for our grid
const GRID_HEIGHT = 40;
const GRID_WIDTH = 40;
const MAX_ROOMS = 15;
const ROOM_SIZE_RANGE: [number, number] = [7, 12];

// Add our settings to an object for ease-of-reference
export const gridSettings: GridSettings = {
  GRID_HEIGHT,
  GRID_WIDTH,
  MAX_ROOMS,
  ROOM_SIZE_RANGE,
};

export function createDungeon(): GridAndRooms {
  // 1. Let's store our grid squares in a 2d array
  let grid: GridAndRooms = { grid: [], placedRooms: [] };
  for (
    let heightIndex = 0;
    heightIndex < gridSettings.GRID_HEIGHT;
    heightIndex++
  ) {
    // Walk through our grid height and push an empty array into
    // the existing grid array
    grid.grid.push([]);
    for (
      let widthIndex = 0;
      widthIndex < gridSettings.GRID_WIDTH;
      widthIndex++
    ) {
      const opacity = randomInteger(3, 8) / 10;

      grid.grid[heightIndex].push({
        type: 0,
        opacity,
      });
    }
  }

  // 2. random values for the first room
  const [min, max] = gridSettings.ROOM_SIZE_RANGE;
  const firstRoom = {
    x: randomInteger(1, gridSettings.GRID_WIDTH - max - 15),
    y: randomInteger(1, gridSettings.GRID_HEIGHT - max - 15),
    height: randomInteger(min, max),
    width: randomInteger(min, max),
  };

  // 3. place the first room on to grid
  grid = placeCells(grid, firstRoom);

  // 4. using the first room as a seed, recursivley add rooms to the grid

  // return grid;

  // return growMap(
  //   { grid, placedRooms: [firstRoom] },
  //   [firstRoom],
  //   1,
  //   gridSettings.MAX_ROOMS
  // );
  return growMap(grid, [firstRoom]);
}
