import { createDungeon } from "../../src/create-dungeon";
import { createEntities } from "../../src/create-entities";
import "./dungeon-crawler.css";
import Dungeon from "./dungeon";
import { useRef } from "react";
type Props = {};

let dungeon = createDungeon();
let entities = createEntities(dungeon);

export const frontMatter = {
  title: "Dungeon Crawler",
  layout: "base.njk",
};

export function DungeonCrawler({}: Props) {
  return (
    <div className="App">
      <Dungeon entities={entities} />
    </div>
  );
}

export default DungeonCrawler;
