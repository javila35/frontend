import { Season } from "./season";

export type Player = {
  id: number;
  name: string;
  seasons: Season[];
};
