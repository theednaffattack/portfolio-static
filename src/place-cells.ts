import { GridAndRooms, GridSquare, Room } from "./create-dungeon";

export function placeCells(
  // grid: GridSquare[][],
  grid: GridAndRooms,
  { x, y, width = 1, height = 1, id }: Room,
  type: GridSquare["type"] = "floor"
): GridAndRooms {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      // grid[i][j] = { type, id };
      grid.grid[i][j] = { type, id };
    }
  }
  // return { grid, placeCells: { x, y, width, height, id } };
  return grid;
}
