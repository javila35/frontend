import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "../../api";
import { NavLink } from "react-router";

export const PlayersPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allPlayers"],
    queryFn: getAllPlayers,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-4xl">Players</h1>
      <button className="bg-norway-400 h-auto w-fit rounded-md border border-black p-2 text-xl font-medium tracking-wider">
        Add new player
      </button>
      <ul className="flex flex-col gap-2">
        {data?.map(({ id, name }) => (
          <NavLink to={`/players/${id}`} key={`player-${id}`}>
            <li>{name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
