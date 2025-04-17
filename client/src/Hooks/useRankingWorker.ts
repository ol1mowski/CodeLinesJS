import { useCallback, useEffect, useRef } from 'react';
import { RankingUser } from '../types/ranking.types';

type WorkerMessage = {
  type: string;
  users?: RankingUser[];
  stats?: Array<{ id: string; stats: number }>;
};

export const useRankingWorker = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/rankingWorker.ts', import.meta.url), {
      type: 'module',
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const sortUsers = useCallback((users: RankingUser[]) => {
    return new Promise<RankingUser[]>(resolve => {
      if (!workerRef.current) return resolve(users);

      const handleMessage = (event: MessageEvent<WorkerMessage>) => {
        if (event.data.type === 'SORTED_USERS' && event.data.users) {
          workerRef.current?.removeEventListener('message', handleMessage);
          resolve(event.data.users);
        }
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({ type: 'SORT_USERS', users });
    });
  }, []);

  const calculateStats = useCallback((users: RankingUser[]) => {
    return new Promise<Array<{ id: string; stats: number }>>(resolve => {
      if (!workerRef.current) return resolve([]);

      const handleMessage = (event: MessageEvent<WorkerMessage>) => {
        if (event.data.type === 'CALCULATED_STATS' && event.data.stats) {
          workerRef.current?.removeEventListener('message', handleMessage);
          resolve(event.data.stats);
        }
      };

      workerRef.current.addEventListener('message', handleMessage);
      workerRef.current.postMessage({ type: 'CALCULATE_STATS', users });
    });
  }, []);

  return {
    sortUsers,
    calculateStats,
  };
};
