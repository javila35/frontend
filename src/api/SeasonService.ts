import axios from "axios";
import { ROOT_API_URL } from ".";
import { Season } from "../types";

export const getAllSeasons = async () => {
  const { data } = await axios.get<Season[]>(`${ROOT_API_URL}/seasons`);
  return data;
};

export const getSeasonById = async (id: string | number) => {
  const { data } = await axios.get<Season>(`${ROOT_API_URL}/seasons/${id}`);
  return data;
};
