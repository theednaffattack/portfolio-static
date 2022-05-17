import { HealthPotion } from "./create-entities";

interface PotionRegistry {
  elixir: HealthPotion;
}
export const potionRegistry: PotionRegistry = {
  elixir: {
    name: "Elixir",
    health: 15,
    type: "potion",
    cost: 10,
  },
};
