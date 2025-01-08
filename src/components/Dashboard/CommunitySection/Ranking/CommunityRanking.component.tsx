import { memo, useState } from "react";
import { RankingList } from "./RankingList.component";
import { RankingStats } from "./RankingStats.component";
import { RankingPeriod } from "../../../../types/ranking.types";
import { RankingPeriodSelect } from "./RankingPeriodSelect.component";

export const CommunityRanking = memo(() => {
  const [period, setPeriod] = useState<RankingPeriod>("weekly");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Ranking
            </h2>
            <RankingPeriodSelect value={period} onChange={setPeriod} />
          </div>
          <RankingList period={period} />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <RankingStats />
        </div>
      </div>
    </div>
  );
});

CommunityRanking.displayName = "CommunityRanking"; 