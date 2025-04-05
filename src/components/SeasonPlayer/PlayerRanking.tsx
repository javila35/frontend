type PlayerRankingProps = {
  name: string;
  ranking?: number;
};

export const PlayerRanking = ({ name, ranking }: PlayerRankingProps) => {
  return (
    <li className="w-full">
      {/* TODO: Apply styling to input so it's visible */}
      {name} {ranking ? ranking : <input type="number" />}
    </li>
  );
};
