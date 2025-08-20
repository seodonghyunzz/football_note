import LegueLankingClient from './clientComponent/LegueLankingClient';

export interface standingsTeam {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
  goalsDiff: number;
}

export default async function LegueLanking() {
  const standings: standingsTeam[] = await getFootballData();
  const top10 = standings.slice(0, 10);
  const bottom10 = standings.slice(10);
  if (!top10 || !bottom10) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center border rounded-lg shadow-md ">
      <LegueLankingClient bottom={bottom10} top={top10} />
    </div>
  );
}

export async function getFootballData() {
  const res = await fetch(
    'https://v3.football.api-sports.io/standings?league=39&season=2023',
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': process.env.RAPIDAPI_KEY ?? '',
      },
      next: { revalidate: 86400 },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.response[0].league.standings[0] as standingsTeam[];
}
