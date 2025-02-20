import axios from "axios";
import { Player } from "../types";
import { ROOT_API_URL } from ".";

type CreatePlayerParams = {
  name: string;
};

export const createPlayer = async ({ name }: CreatePlayerParams) => {
  const { data } = await axios.post<Player>(`${ROOT_API_URL}/players`, {
    name,
  });
  return data;
};

export const getAllPlayers = async () => {
  const { data } = await axios.get<Player[]>(`${ROOT_API_URL}/players`);
  return data;
};

export const getPlayerById = async (id: number) => {
  const { data } = await axios.get<Player>(`${ROOT_API_URL}/players/${id}`);
  return data;
};
