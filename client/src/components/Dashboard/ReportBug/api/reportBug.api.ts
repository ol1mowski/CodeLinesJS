import { httpClient } from "../../../../api/httpClient.api";

import { FormData } from '../hooks/types';

export const useReportBug = () => {
  

  const reportBug = async (data: FormData) => {
    const response = await httpClient.post('reports', data);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  };

  return { reportBug };
};
