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
    <div>
      <ul>
        {data?.map(({ id, name }) => (
          <NavLink to={`/seasons/${id}`}>
            <li key={id}>{name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
