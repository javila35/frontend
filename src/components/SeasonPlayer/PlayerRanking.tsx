import { useState } from "react";

type PlayerRankingProps = {
  name: string;
  ranking?: number;
};

export const PlayerRanking = ({ name, ranking }: PlayerRankingProps) => {
  const [localRanking, setLocalRanking] = useState<number | string>(
    ranking || "",
  );
  const [displayError, setDisplayError] = useState<boolean>(false);

  const error = "Ranking must be less than or equal to 10";

  const onRankingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setLocalRanking("");
      setDisplayError(false);
      return;
    }

    const rankingInput = Number(value);
    setLocalRanking(rankingInput);
    if (rankingInput <= 10) {
      setDisplayError(false);
    } else {
      setDisplayError(true);
    }
  };

  return (
    <li className="flex h-8 w-full gap-4">
      {name}
      <span className="flex w-fit flex-col">
        <input
          className="rounded-md border border-black"
          type="number"
          value={localRanking}
          max={10}
          onChange={onRankingChange}
        />
        {
          <span
            className={`h-4 text-red-500 ${displayError ? "visible" : "invisible"}`}
          >
            {error}
          </span>
        }
      </span>
    </li>
  );
};
