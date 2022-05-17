import { GridAndRooms, gridSettings } from "./create-dungeon";
import { Coords } from "./game-action";
import { randomInteger } from "./util.random-number";

export function createEntities(gameMap: GridAndRooms, level = 1) {
  //they are all arrays because we will use
  // pop() with an (while array has length > 0) loop

  const bosses: any[] = [];
  if (level === 4) {
    bosses.push({
      health: 400,
      level: 5,
      type: "boss",
    });
  }
  const enemies: any[] = [];

  for (let i = 0; i < 7; i++) {
    enemies.push({
      health: level * 30 + 40,
      // half of the enememies will be a level higher or lower (except on
      // level 1, where ~1/4 enemies are a level higher)
      level: randomInteger(
        level,
        randomInteger(level - 1 ? level - 1 : level, level + 1)
      ),
      type: "enemy",
    });
  }
  const exits = [];
  if (level < 4) {
    exits.push({
      type: "exit",
    });
  }

  const players = [
    {
      type: "player",
    },
  ];

  const potions = [];
  for (let i = 0; i < 5; i++) {
    potions.push({ type: "potion" });
  }

  const weaponTypes = [
    {
      name: "Laser Pistol",
      damage: 15,
    },
    {
      name: "Laser Rifle",
      damage: 19,
    },
    {
      name: "Plasma Pistol",
      damage: 26,
    },
    {
      name: "Plasma Rifle",
      damage: 28,
    },
    {
      name: "Electric ChainSaw",
      damage: 31,
    },
    {
      name: "Railgun",
      damage: 33,
    },
    {
      name: "Dark Energy Cannon",
      damage: 40,
    },
    {
      name: "B.F.G",
      damage: 43,
    },
  ];

  const weapons: any[] = [];
  // weapon types will vary based on the level passed to the  createEntities function
  const qualifying = weaponTypes
    .filter((weapon) => weapon.damage < level * 10 + 10)
    .filter((weapon) => weapon.damage > level * 10 - 10);

  //for loop that will generate 3 random weapons per level using the filtered qualifying array
  for (let i = 0; i < 3; i++) {
    //the Object.assign() method is used to copy the values from one or more source objects to a target object.
    //It will return the target object --> the target object is {}

    const weapon: { type?: string; name: string; damage: number } =
      Object.assign({}, qualifying[randomInteger(0, qualifying.length - 1)]);
    weapon.type = "weapon";
    weapons.push(weapon);
  }

  // 2. randomly place all the entities on to floor cells on the game map.

  // we'll need to return the players starting co-ordinates
  let playerPosition: Coords = [0, 0];

  [potions, enemies, weapons, exits, players, bosses].forEach((entities) => {
    //The forEach() method executes a provided function once per array element.

    //it will iterate until entities has something inside.
    //entities will decrease only if type of cell == 'floor'
    while (entities.length) {
      const x = Math.floor(Math.random() * gridSettings.GRID_WIDTH);
      const y = Math.floor(Math.random() * gridSettings.GRID_HEIGHT);

      if (gameMap.grid[y][x].type === "floor") {
        if (entities[0].type === "player") {
          playerPosition = [x, y];
        }
        //The pop() method removes the last element from an array and returns that element
        gameMap.grid[y][x] = entities.pop();
      }
    }
  });

  // 3. we replace doors with floors so later on we can pass
  //from one room to another using Redux actions
  for (let i = 0; i < gameMap.grid.length; i++) {
    for (let j = 0; j < gameMap.grid[0].length; j++) {
      // console.log("WHAT IS THIS???", gameMap.grid[i][j]);
      if (gameMap.grid[i][j].type === "door") {
        gameMap.grid[i][j].type = "floor";
      }
    }
  }

  // finaly we return an object with the newly created gameMap and the playerPosition
  return { entities: gameMap, playerPosition };
}
