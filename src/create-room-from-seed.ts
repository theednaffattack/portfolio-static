import { placeCells } from "./place-cells";
import { randomInteger } from "./random-integer";
import { Room, gridSettings, GridSquare, GridAndRooms } from "./create-dungeon";
import { isValidRoomPlacement } from "./is-valid-room-placement";

export function createRoomsFromSeed(
  grid: GridAndRooms,
  { x, y, width, height }: Room,
  range = gridSettings.ROOM_SIZE_RANGE
): {
  grid: GridSquare[][];
  placedRooms: Room[];
} {
  // range for generating the random room heights and widths
  const [min, max] = range;

  // generate room values for each edge of the seed room
  const roomValues = [];

  const north: Room = {
    height: randomInteger(min, max),
    width: randomInteger(min, max),
  };
  north.x = randomInteger(x, x + width - 1);
  north.y = y - north.height - 1;
  north.doorx = randomInteger(
    north.x,
    Math.min(north.x + north.width, x + width) - 1
  );
  north.doory = y - 1;
  roomValues.push(north);

  const east: Room = {
    height: randomInteger(min, max),
    width: randomInteger(min, max),
  };
  east.x = x + width + 1;
  east.y = randomInteger(y, height + y - 1);
  east.doorx = east.x && east.x - 1;
  east.doory = randomInteger(
    east.y,
    Math.min(east.y + east.height, y + height) - 1
  );
  roomValues.push(east);

  const south: Room = {
    height: randomInteger(min, max),
    width: randomInteger(min, max),
  };
  south.x = randomInteger(x, width + x - 1);
  south.y = y + height + 1;
  south.doorx = randomInteger(
    south.x,
    Math.min(south.x + south.width, x + width) - 1
  );
  south.doory = y + height;
  roomValues.push(south);

  const west: Room = {
    height: randomInteger(min, max),
    width: randomInteger(min, max),
  };
  west.x = x - west.width - 1;
  west.y = randomInteger(y, height + y - 1);
  west.doorx = x - 1;
  west.doory = randomInteger(
    west.y,
    Math.min(west.y + west.height, y + height) - 1
  );
  roomValues.push(west);

  const placedRooms: Room[] = [];

  roomValues.forEach((room) => {
    if (isValidRoomPlacement(grid.grid, room)) {
      // place room
      grid = placeCells(grid, room);
      // place door
      grid = placeCells(grid, { x: room.doorx, y: room.doory }, "door");
      // need placed room values for the next seeds
      placedRooms.push(room);
    }
  });
  return { grid: grid.grid, placedRooms };
}
