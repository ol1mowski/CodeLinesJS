import { httpClient } from "../../../../../../../api/httpClient.api";
import { 
  CVTip, 
  CVExample, 
  CVStats, 
  CVTipQuery, 
  CVExampleQuery, 
  PaginatedResponse,
  CVUserProgressUpdate 
} from '../types/cv.types';


export const getTips = async (query: CVTipQuery = {}): Promise<PaginatedResponse<CVTip>> => {
  const searchParams = new URLSearchParams();
  
  if (query.category) searchParams.append('category', query.category);
  if (query.importance) searchParams.append('importance', query.importance);
  if (query.search) searchParams.append('search', query.search);
  if (query.tags?.length) searchParams.append('tags', query.tags.join(','));
  if (query.limit) searchParams.append('limit', query.limit.toString());
  if (query.page) searchParams.append('page', query.page.toString());
  if (query.sortBy) searchParams.append('sortBy', query.sortBy);
  if (query.sortOrder) searchParams.append('sortOrder', query.sortOrder);

  const response = await httpClient.get(`cv/tips?${searchParams}`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
}

export const getExamples = async (query: CVExampleQuery = {}): Promise<PaginatedResponse<CVExample>> => {
  const searchParams = new URLSearchParams();
  
  if (query.type) searchParams.append('type', query.type);
  if (query.level) searchParams.append('level', query.level);
  if (query.field) searchParams.append('field', query.field);
  if (query.search) searchParams.append('search', query.search);
  if (query.tags?.length) searchParams.append('tags', query.tags.join(','));
  if (query.limit) searchParams.append('limit', query.limit.toString());
  if (query.page) searchParams.append('page', query.page.toString());
  if (query.sortBy) searchParams.append('sortBy', query.sortBy);
  if (query.sortOrder) searchParams.append('sortOrder', query.sortOrder);

  const response = await httpClient.get(`cv/examples?${searchParams}`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
}

export const getStats = async (): Promise<CVStats> => {
  const response = await httpClient.get(`cv/stats`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
}

export const updateProgress = async (update: CVUserProgressUpdate): Promise<void> => {
  const response = await httpClient.post(`cv/progress`, update);
  if (response.error) {
    throw new Error(response.error);
  }
}

export const getUserProgress = async () => {
  const response = await httpClient.get(`cv/progress`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
} 