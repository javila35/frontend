import { Player, SeasonPlayer } from "../types";

type PrepPlayersForComboboxParams = {
  allPlayersList: Player[];
  seasonPlayersList: SeasonPlayer[];
};
export const prepPlayersForComboBox = ({
  seasonPlayersList,
  allPlayersList,
}: PrepPlayersForComboboxParams) => {
  const playersNotInThisSeason: Player[] = [];

  allPlayersList.forEach((player) => {
    const playerInSeason = seasonPlayersList.find((p) => p.id === player.id);
    if (playerInSeason) {
      return;
    } else {
      playersNotInThisSeason.push(player);
    }
  });

  return playersNotInThisSeason?.map((player) => ({
    id: player.id,
    name: player.name,
  }));
};
