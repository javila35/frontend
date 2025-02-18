import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Input } from "@heroui/react";
import { getSeasonById } from "../../api";
import { Season } from "../../types";

export const SeasonPage = () => {
  const { id } = useParams();
  if (!id) {
    return <div>Error! No id in url</div>;
  }

  const { isPending, isError, data, error } = useQuery<Season>({
    queryKey: ["season", id],
    queryFn: () => getSeasonById(id),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
      <h1>{data.name}</h1>
      <h2>Players</h2>
      <ul>{data.players?.map((p) => <li>{p.name}</li>)}</ul>
      <Input placeholder="Add player" />
    </div>
  );
};
