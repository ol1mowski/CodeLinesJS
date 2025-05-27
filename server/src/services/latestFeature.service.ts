import { LatestFeature, ILatestFeature } from '../models/latestFeature.model.js';

export interface CreateLatestFeatureDto {
  title: string;
  description: string;
  category: 'feature' | 'update' | 'improvement' | 'bugfix';
  version?: string;
  priority?: number;
  releaseDate?: Date;
  tags?: string[];
  icon?: string;
}

export interface UpdateLatestFeatureDto extends Partial<CreateLatestFeatureDto> {
  isActive?: boolean;
}

export interface LatestFeatureQuery {
  category?: string;
  isActive?: boolean;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class LatestFeatureService {
  async getLatestFeatures(query: LatestFeatureQuery = {}): Promise<ILatestFeature[]> {
    const {
      category,
      isActive = true,
      limit = 2,
      skip = 0,
      sortBy = 'releaseDate',
      sortOrder = 'desc',
    } = query;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (typeof isActive === 'boolean') {
      filter.isActive = isActive;
    }

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    if (sortBy === 'releaseDate') {
      sortOptions.priority = -1;
    }

    const features = await LatestFeature.find(filter)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    return features;
  }
}

export const latestFeatureService = new LatestFeatureService();
