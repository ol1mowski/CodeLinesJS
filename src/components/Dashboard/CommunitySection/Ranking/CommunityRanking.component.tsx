import { memo, useState } from "react";
import { RankingList } from "./RankingList.component";
import { RankingStats } from "./RankingStats.component";
import { RankingPeriod } from "../../../../types/ranking.types";
import { RankingPeriodSelect } from "./RankingPeriodSelect.component";

const CommunityRanking = memo(() => {
  const [period, setPeriod] = useState<RankingPeriod>("weekly");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-js">Ranking</h2>
            <RankingPeriodSelect value={period} onChange={setPeriod} />
          </div>
          <RankingList period={period} />
        </div>
      </div>
      <div className="space-y-6">
        <RankingStats />
      </div>
    </div>
  );
});

export default CommunityRanking;

CommunityRanking.displayName = "CommunityRanking"; 