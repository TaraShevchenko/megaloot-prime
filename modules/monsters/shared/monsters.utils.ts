import { MonsterId } from "modules/monsters";

export const formatMonsterName = (monsterId: MonsterId) =>
  monsterId.replace(/-/g, " ").replace(/^\w/, (match) => match.toUpperCase());
