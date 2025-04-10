/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { addPlayerToSeason, getAllPlayers, getSeasonById } from "../../api";
import { Player, Season } from "../../types";
import { Button } from "../../components/Button";
import { ComboBox, ComboBoxOption, PlayerRanking } from "../../components";

type PlayerMutationParams = {
  playerId?: number;
  playerName?: string;
};

export const SeasonPage = () => {
  const [input, setInput] = useState<string>("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [playerList, setPlayerList] = useState<ComboBoxOption[]>([]);
  const [error, setError] = useState({});
  const { id } = useParams();
  const queryClient = useQueryClient();

  if (!id) {
    return <div>No id in url</div>;
  }

  const seasonQuery = useQuery<Season>({
    queryKey: ["season", id],
    queryFn: () => getSeasonById(id),
  });

  const playersQuery = useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });

  const addPlayerMutation = useMutation({
    mutationFn: ({ playerName = "", playerId }: PlayerMutationParams) =>
      addPlayerToSeason({
        seasonId: parseInt(id),
        playerName: playerName,
        playerId: playerId,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(["season", id], data);
      queryClient.invalidateQueries({ queryKey: ["players"] });
      setInput("");
    },
  });

  // Set errors if encountering them
  useEffect(() => {
    if (seasonQuery.isError) {
      setError((prevError) => ({
        ...prevError,
        getSeasonError: seasonQuery.error,
      }));
    }
    if (playersQuery.isError) {
      setError((prevError) => ({
        ...prevError,
        getPlayersError: playersQuery.error,
      }));
    }
  }, [seasonQuery, playersQuery]);

  // Prep player list for combobox
  useEffect(() => {
    if (playersQuery.isSuccess && seasonQuery.isSuccess) {
      setPlayerList(
        prepPlayersForComboBox({
          allPlayersList: playersQuery.data,
          seasonPlayersList: seasonQuery.data.players,
        }),
      );
    }
  }, [
    playersQuery.isSuccess,
    playersQuery.data,
    seasonQuery.isSuccess,
    seasonQuery.data,
  ]);

  if (seasonQuery.isPending || playersQuery.isPending) {
    return <div>Loading...</div>;
  }

  if (seasonQuery.isError || playersQuery.isError) {
    return <span>Error</span>;
  }

  const handleComboboxClick = (id: number) => {
    setSelectedPlayerId(id);
    console.log(selectedPlayerId);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-4xl">{seasonQuery.data.name}</h2>
      <h3 className="text-2xl">Players</h3>
      <ul>
        {seasonQuery.data.players?.map(({ id, name, ranking }) => (
          <PlayerRanking key={`player-${id}`} name={name} ranking={ranking} />
        ))}
      </ul>
      <div className="flex max-h-12 flex-row">
        {/* <Input /> */}
        <ComboBox
          filterValue={input}
          onChange={(e) => setInput(e.target.value)}
          resourceType="player"
          options={playerList}
          onResourceClick={handleComboboxClick}
          onNewResourceClick={(playerName: string) =>
            addPlayerMutation.mutate({ playerName })
          }
        />
        <Button text="Submit" />
      </div>
    </div>
  );
};
