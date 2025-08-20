import { standingsTeam } from '../LegueLanking';
import TopStanding from './topstanding';
import BottomStanding from './bottomstanding';

interface standingsTeamProps {
  bottom: standingsTeam[];
  top: standingsTeam[];
}

export default function LegueLankingClient({
  bottom,
  top,
}: standingsTeamProps) {
  return (
    <div className="inline-block overflow-hidden">
      <div className="rankcard">
        <div className="first-content">
          <span>
            <TopStanding top={top} />
          </span>
        </div>
        <div className="second-content">
          <span>
            <BottomStanding bottom={bottom} />
          </span>
        </div>
      </div>
    </div>
  );
}
