import axios from "axios";
import { createPlayer, ROOT_API_URL } from ".";
import { Season } from "../types";

export type AddPlayerToSeasonParams =
  | AddNewPlayerToSeasonParams
  | AddExistingPlayerToSeasonParams;

type AddNewPlayerToSeasonParams = {
  playerName: string;
  seasonId: number;
};

type AddExistingPlayerToSeasonParams = {
  playerId: number;
  seasonId: number;
};

export const addPlayerToSeason = async (params: AddPlayerToSeasonParams) => {
  const { seasonId } = params;
  let playerId;
  if ("playerName" in params) {
    playerId = (await createPlayer({ name: params.playerName })).id;
  } else {
    playerId = params.playerId;
  }
  const { data } = await axios.post<Season>(
    `${ROOT_API_URL}/seasons/${seasonId}/addPlayerToSeason`,
    { playerId },
  );
  return data;
};

export const getAllSeasons = async () => {
  const { data } = await axios.get<Season[]>(`${ROOT_API_URL}/seasons`);
  return data;
};

export const getSeasonById = async (id: string | number) => {
  const { data } = await axios.get<Season>(`${ROOT_API_URL}/seasons/${id}`);
  return data;
};
