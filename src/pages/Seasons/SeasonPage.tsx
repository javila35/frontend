import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getSeasonById } from "../../api";
import { Season } from "../../types";
import { Button } from "../../components/Button";
import { ComboBox } from "../../components";

export const SeasonPage = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
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

  const handleComboboxClick = (id: number) => {
    setSelectedPlayerId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-4 text-4xl">{data.name}</h2>
      <h3 className="text-2xl">Players</h3>
      <ul>{data.players?.map((p) => <li>{p.name}</li>)}</ul>
      <div className="flex flex-row max-h-12">
        {/* <Input /> */}
        <ComboBox
          options={[
            { id: 1, name: "joe" },
            { id: 2, name: "David" },
          ]}
          onClick={(id) => handleComboboxClick(id)}
        />
        <Button text="Submit" />
      </div>
    </div>
  );
};
