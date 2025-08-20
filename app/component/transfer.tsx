import { s } from 'framer-motion/client';
import TransferCard from './clientComponent/transferCard';

export const teamId = [50, 42, 40, 66, 47, 49, 34, 33, 48, 52];

export default async function Transfer() {
  const transferData = await getTransferNews();
  const mainTransfers = transferData.slice(0, 6);
  // if (transferData === null || transferData.length === 0) {
  //     return <div>이적 소식을 불러오는 중입니다...</div>;
  // }

  // 넘겨줄 데이터= 선수이름, 선수 아이디, 이적 전팀, 이적 후 팀, 이적 날짜, 가격
  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="transferNews_title font-semibold font-[Caveat] text-[32px]">
          Transfer News
        </h2>
        <p>더보기</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {mainTransfers.map((transfer) => (
          <div className="flex-1" key={transfer.player.id}>
            <TransferCard
              playerName={transfer.player.name}
              playerId={transfer.player.id}
              inTeam={transfer.transfers[0].teams.in.name}
              inTeamLogo={transfer.transfers[0].teams.in.logo}
              outTeam={transfer.transfers[0].teams.out.name}
              outTeamLogo={transfer.transfers[0].teams.out.logo}
              transferDate={transfer.transfers[0].date}
              price={transfer.transfers[0].type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

async function getTransferNews() {
  const res = teamId.map((id) =>
    fetch(`https://v3.football.api-sports.io/transfers?team=${id}`, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': process.env.RAPIDAPI_KEY ?? '',
      },
      next: { revalidate: 86400 },
    }).then((r) => r.json()),
  );

  const data = await Promise.all(res);

  const allTransfers = data.flatMap((team) => team.response);

  // 2023년만 필터링
  const recentData = allTransfers.filter((t) => {
    const date = t.transfers?.[0]?.date;
    return date?.startsWith('2023');
  });

  // 이적 유형이 'Free', 'Loan', 'N/A'가 아닌 것만 필터링
  const filteredData = recentData.filter(
    (transfer) =>
      transfer.transfers?.[0]?.type !== 'Free' &&
      transfer.transfers?.[0]?.type !== 'Loan' &&
      transfer.transfers?.[0]?.type !== 'N/A',
  );

  const sortedData = filteredData.sort((a, b) => {
    const priceA = parsePrice(a.transfers?.[0]?.type ?? '');
    const priceB = parsePrice(b.transfers?.[0]?.type ?? '');
    return priceB - priceA; //가격 순 정렬
  });

  const uniqueData: typeof sortedData = [];
  const uniqueIds = new Set<number>();
  // 중복된 선수 ID를 제거

  sortedData.forEach((transfer) => {
    const playerId = transfer.player.id;
    if (!uniqueIds.has(playerId)) {
      uniqueIds.add(playerId);
      uniqueData.push(transfer);
    }
  });
  return uniqueData;
}

function parsePrice(price: string): number {
  if (!price) return 0;
  const number = price
    .replace(/[^0-9.]/g, '') // 숫자와 .만 남기기
    .trim();
  let value = parseFloat(number); // 문자열을 숫자로 변환(소수점까지 써야함)
  if (price.includes('M')) value *= 1_000_000;
  if (price.includes('K')) value *= 1_000;

  return isNaN(value) ? 0 : value;
}
