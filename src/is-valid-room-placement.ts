import type { GridSquare, Room } from "./create-dungeon";

// Helper functions

export function isValidRoomPlacement(
  grid: GridSquare[][],
  { x, y, width = 1, height = 1 }: Room
): boolean {
  // Check if on the edge of or outside of the grid
  // If the y coordinate is less than 1 (impossible) or if y plus
  // the room height is greater than the grid's length, it is not valid
  if (y < 1 || y + height > grid.length - 1) {
    return false;
  }

  // If the x coordinate is less than 1, or if x plus the room width is
  // greater than the first grid row's length (knowing that all grid rows
  // are the same length), it is invalid
  if (x < 1 || x + width > grid[0].length - 1) {
    return false;
  }

  // Check if on or adjacent to existing room
  // Loop through the current column
  // While looping, loop again through each row and check
  // if the cell type is "floor". If it IS a floor, it is invalid.
  for (let i = y - 1; i < y + height + 1; i++) {
    for (let j = x - 1; j < x + width + 1; j++) {
      if (grid[i][j].type === "floor") {
        return false;
      }
    }
  }

  // If we've made it through the 'if' statements above,
  // the proposed placement is valid.
  return true;
}
