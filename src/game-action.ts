/////////////////////actions////////////////////////
//to make use of an action we will simple say
//
// store.dispatch( changePlayerPosition( playerCoords );
//changePlayerPosition(playerCoords) returns an object with 2 properties
//this object and the current store.state
//will then be passed to the reducer export function that will return
// whatever we decide in the switch statements

import { createDungeon, GridSquare } from "./create-dungeon";
import { createEntities } from "./create-entities";
import { Coords } from "./game-reducer";

export function changeEntity(entity: GridSquare, coords: Coords) {
  return {
    type: "t.CHANGE_ENTITY",
    payload: { entity, coords },
  };
}

export function changePlayerPosition(payload: Coords) {
  return {
    type: "t.CHANGE_PLAYER_POSITION",
    payload,
  };
}

export function createLevel(level: number) {
  return {
    type: "t.CREATE_LEVEL",
    payload: createEntities(createDungeon(), level),
  };
}

export function setDungeonLevel(payload: any) {
  return {
    type: "t.SET_DUNGEON_LEVEL",
    payload,
  };
}
