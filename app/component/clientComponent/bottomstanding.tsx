import { standingsTeam } from '../LegueLanking';

interface BottomStandingProps {
  bottom: standingsTeam[];
}

export default function BottomStanding({ bottom }: BottomStandingProps) {
  return (
    <div
      className="w-full max-w-4xl bg-white rounded-lg shadow overflow-hidden"
      style={{ fontFamily: 'Dongle', fontSize: '24px' }}
    >
      <table className="w-full text-left">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3">순위</th>
            <th className="p-3">팀</th>
            <th className="p-3">승점</th>
            <th className="p-3">승/무/패</th>
            <th className="p-3">득실차</th>
          </tr>
        </thead>
        <tbody>
          {bottom.map((team: standingsTeam) => (
            <tr key={team.team.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{team.rank}</td>
              <td className="p-3 flex items-center gap-2">
                <img
                  src={team.team.logo}
                  alt={team.team.name}
                  className="w-6 h-6"
                />
                {team.team.name}
              </td>
              <td className="p-3">{team.points}</td>
              <td className="p-3">
                {team.all.win}/{team.all.draw}/{team.all.lose}
              </td>
              <td className="p-3">{team.goalsDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
