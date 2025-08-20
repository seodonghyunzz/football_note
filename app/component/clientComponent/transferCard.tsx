interface transferProps {
  playerName: string;
  playerId: number;
  inTeam: string;
  inTeamLogo: string;
  outTeam: string;
  outTeamLogo: string;
  transferDate: string;
  price: string;
}

export default async function TransferCard({
  playerName,
  playerId,
  inTeam,
  inTeamLogo,
  outTeam,
  outTeamLogo,
  transferDate,
  price,
}: transferProps) {
  const playerImage = await getPlayerImage(playerId);

  return (
    <div className="transfercard font-[Dongle] text-[24px] w-[200px] h-[200px] flex flex-col items-center justify-center rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img src={playerImage} />
      <div
        className="transfercard__content absolute top-0 left-0"
        style={{
          backgroundImage: `url(${inTeamLogo})`,
          backgroundSize: 'cover',
          opacity: 0.3,
          PointerEvents: 'none',
        }}
      />
      <div className="transfercard__content relative z-10 text-[24px] flex flex-col">
        <p className="transfercard__title truncate">{playerName}</p>
        <p className="transfercard__description truncate ">{outTeam}</p>
        <p className="transfercard__description truncate">to {inTeam}</p>
        <p className="transfercard__description">{price}</p>
      </div>
    </div>
  );
}

async function getPlayerImage(playerId: number) {
  const res = await fetch(
    `https://v3.football.api-sports.io/players?id=${playerId}&season=2023`,
    {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': process.env.RAPIDAPI_KEY ?? '',
      },
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch player image');
  }
  const data = await res.json();
  return data.response[0].player.photo as string;
}
