import { CVExample } from '../../models/cvExample.model.js';
import { CVTip } from '../../models/cvTip.model.js';
import { CVUserProgress } from '../../models/cvUserProgress.model.js';
import {
  CVTipQuery,
  CVExampleQuery,
  CVStatsResponse,
  CVTipResponse,
  CVExampleResponse,
  CVUserProgressUpdate,
  PaginatedResponse,
} from '../../types/cv.types.js';

export class CVService {
  static async getTips(
    query: CVTipQuery,
    _userId?: string,
  ): Promise<PaginatedResponse<CVTipResponse>> {
    const {
      category,
      importance,
      search,
      tags,
      limit = 10,
      page = 1,
      sortBy = 'order',
      sortOrder = 'asc',
    } = query;

    const mongoQuery: Record<string, unknown> = { isPublished: true };

    if (category) mongoQuery.category = category;
    if (importance) mongoQuery.importance = importance;
    if (tags && tags.length > 0) mongoQuery.tags = { $in: tags };
    if (search) {
      mongoQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sort: { [key: string]: 1 | -1 } = {};
    if (sortBy === 'importance') {
      sort.importance = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const skip = (page - 1) * limit;
    const [tips, total] = await Promise.all([
      CVTip.find(mongoQuery).sort(sort).skip(skip).limit(limit).lean(),
      CVTip.countDocuments(mongoQuery),
    ]);

    const formattedTips: CVTipResponse[] = tips.map((tip) => ({
      id: tip._id.toString(),
      title: tip.title,
      description: tip.description,
      category: tip.category,
      importance: tip.importance,
      icon: tip.icon,
      examples: tip.examples,
      tags: tip.tags,
      viewCount: tip.viewCount,
      helpfulCount: tip.helpfulCount,
      createdAt: tip.createdAt.toISOString(),
      updatedAt: tip.updatedAt.toISOString(),
    }));

    return {
      data: formattedTips,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  static async getExamples(
    query: CVExampleQuery,
    _userId?: string,
  ): Promise<PaginatedResponse<CVExampleResponse>> {
    const {
      type,
      level,
      field,
      search,
      tags,
      limit = 10,
      page = 1,
      sortBy = 'order',
      sortOrder = 'asc',
    } = query;

    const mongoQuery: Record<string, unknown> = { isPublished: true };

    if (type) mongoQuery.type = type;
    if (level) mongoQuery.level = level;
    if (field) mongoQuery.field = field;
    if (tags && tags.length > 0) mongoQuery.tags = { $in: tags };
    if (search) {
      mongoQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sort: { [key: string]: 1 | -1 } = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;
    const [examples, total] = await Promise.all([
      CVExample.find(mongoQuery).sort(sort).skip(skip).limit(limit).lean(),
      CVExample.countDocuments(mongoQuery),
    ]);

    const formattedExamples: CVExampleResponse[] = examples.map((example) => ({
      id: example._id.toString(),
      title: example.title,
      description: example.description,
      type: example.type,
      level: example.level,
      field: example.field,
      content: example.content,
      highlightPoints: example.highlightPoints,
      tags: example.tags,
      viewCount: example.viewCount,
      copyCount: example.copyCount,
      helpfulCount: example.helpfulCount,
      createdAt: example.createdAt.toISOString(),
      updatedAt: example.updatedAt.toISOString(),
    }));

    return {
      data: formattedExamples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  static async getStats(userId?: string): Promise<CVStatsResponse> {
    const [totalTips, totalExamples, userProgress] = await Promise.all([
      CVTip.countDocuments({ isPublished: true }),
      CVExample.countDocuments({ isPublished: true }),
      userId ? CVUserProgress.findOne({ userId }).lean() : null,
    ]);

    const stats: CVStatsResponse = {
      totalTips,
      totalExamples,
    };

    if (userProgress) {
      stats.userProgress = {
        tipsViewed: userProgress.tips.totalViewed,
        examplesViewed: userProgress.examples.totalViewed,
        completedSections: userProgress.completedSections.length,
        totalSections: 4,
        completionPercentage: userProgress.stats.completionPercentage,
        lastActivityAt: userProgress.stats.lastActivityAt.toISOString(),
      };
    }

    return stats;
  }

  static async updateUserProgress(userId: string, update: CVUserProgressUpdate): Promise<void> {
    const { type, itemId, sectionId, timeSpent, isHelpful } = update;

    let userProgress = await CVUserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new CVUserProgress({
        userId,
        tips: {
          viewed: [],
          totalViewed: 0,
          categories: { content: 0, skills: 0, projects: 0, design: 0 },
        },
        examples: { viewed: [], totalViewed: 0, totalCopied: 0 },
        templates: { viewed: [], totalViewed: 0, totalDownloaded: 0 },
        completedSections: [],
        stats: { totalTimeSpent: 0, lastActivityAt: new Date(), completionPercentage: 0 },
      });
    }

    switch (type) {
      case 'tip_viewed':
        if (!userProgress.tips.viewed.some((v) => v.tipId.toString() === itemId)) {
          userProgress.tips.viewed.push({ tipId: itemId as string });
          userProgress.tips.totalViewed++;
        }
        if (isHelpful !== undefined) {
          const viewedTip = userProgress.tips.viewed.find((v) => v.tipId.toString() === itemId);
          if (viewedTip) {
            viewedTip.isHelpful = isHelpful;
          }
        }
        break;

      case 'example_viewed':
        if (!userProgress.examples.viewed.some((v) => v.exampleId.toString() === itemId)) {
          userProgress.examples.viewed.push({ exampleId: itemId as string });
          userProgress.examples.totalViewed++;
        }
        break;

      case 'example_copied': {
        const viewedExample = userProgress.examples.viewed.find(
          (v) => v.exampleId.toString() === itemId,
        );
        if (viewedExample && !viewedExample.copied) {
          viewedExample.copied = true;
          viewedExample.copiedAt = new Date();
          userProgress.examples.totalCopied++;
        }
        break;
      }

      case 'section_completed':
        if (sectionId && !userProgress.completedSections.some((s) => s.sectionId === sectionId)) {
          userProgress.completedSections.push({ sectionId });
        }
        break;
    }

    if (timeSpent) {
      userProgress.stats.totalTimeSpent += timeSpent;
    }
    userProgress.stats.lastActivityAt = new Date();

    const totalPossible = 4;
    userProgress.stats.completionPercentage = Math.round(
      (userProgress.completedSections.length / totalPossible) * 100,
    );

    await userProgress.save();

    await this.updateItemStats(type, itemId, isHelpful);
  }

  private static async updateItemStats(
    type: string,
    itemId: string,
    isHelpful?: boolean,
  ): Promise<void> {
    switch (type) {
      case 'tip_viewed':
        await CVTip.findByIdAndUpdate(itemId, { $inc: { viewCount: 1 } });
        if (isHelpful === true) {
          await CVTip.findByIdAndUpdate(itemId, { $inc: { helpfulCount: 1 } });
        }
        break;

      case 'example_viewed':
        await CVExample.findByIdAndUpdate(itemId, { $inc: { viewCount: 1 } });
        break;

      case 'example_copied':
        await CVExample.findByIdAndUpdate(itemId, { $inc: { copyCount: 1 } });
        break;
    }
  }
}
