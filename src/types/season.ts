import { SeasonPlayer } from "./Player";

export type Season = {
  name: string;
  id: number;
  players: SeasonPlayer[];
};
