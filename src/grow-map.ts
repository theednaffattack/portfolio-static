import { GridAndRooms, gridSettings, Room } from "./create-dungeon";
import { createRoomsFromSeed } from "./create-room-from-seed";

export function growMap(
  grid: GridAndRooms,
  seedRooms: Room[],
  counter = 1,
  maxRooms = gridSettings.MAX_ROOMS
): GridAndRooms {
  if (!seedRooms) {
    // return { grid, placedRooms: [] };
    return grid;
  }
  if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
    // return { grid, placedRooms: [] };
    return grid;
  }

  const poppedSeed = seedRooms.pop();

  if (!poppedSeed) {
    throw new Error("The seeded room is missing!");
  }

  grid = createRoomsFromSeed(grid, poppedSeed);
  seedRooms.push(...grid.placedRooms);
  counter += grid.placedRooms.length;
  return growMap(grid, seedRooms, counter);
}
