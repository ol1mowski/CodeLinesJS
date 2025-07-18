import { useApi } from '../../../../api/hooks/useApi.hook';
import { FormData } from '../hooks/types';

export const useReportBug = () => {
  const api = useApi<any>();

  const reportBug = async (data: FormData) => {
    const response = await api.post('reports', data);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  };

  return { reportBug };
};
