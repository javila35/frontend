import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { getAllSeasons } from "../../api";
import { Season } from "../../types";

export const SeasonsPage = () => {
  const { isPending, isError, data, error } = useQuery<Season[]>({
    queryKey: ["allSeasons"],
    queryFn: getAllSeasons,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl">Seasons</h1>
      <ul className="flex flex-col gap-2">
        {data?.map(({ id, name }) => (
          <NavLink to={`/seasons/${id}`}>
            <li key={id}>{name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
