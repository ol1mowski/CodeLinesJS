import { Request, Response, NextFunction } from 'express';

import { latestFeatureService, LatestFeatureQuery } from '../../services/latestFeature.service.js';

export class LatestFeaturesController {
  async getLatestFeatures(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query: LatestFeatureQuery = {
        category: req.query.category as string,
        isActive: req.query.isActive === 'false' ? false : true,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 2,
        skip: req.query.skip ? parseInt(req.query.skip as string, 10) : 0,
        sortBy: (req.query.sortBy as string) || 'releaseDate',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
      };

      if (query.limit && (query.limit < 1 || query.limit > 50)) {
        res.status(400).json({
          success: false,
          message: 'Limit musi być między 1 a 50',
        });
        return;
      }

      if (query.skip && query.skip < 0) {
        res.status(400).json({
          success: false,
          message: 'Skip nie może być ujemny',
        });
        return;
      }

      const features = await latestFeatureService.getLatestFeatures(query);

      res.status(200).json({
        success: true,
        data: features,
        count: features.length,
        query: {
          limit: query.limit,
          skip: query.skip,
          category: query.category,
          isActive: query.isActive,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const latestFeaturesController = new LatestFeaturesController();
