import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { Group } from '../../../../models/group.model.js';
import { 
  AuthRequest, 
  MessageController,
  MessageWithUserInfo
} from './types.js';
import { formatReactions, hasUserReported } from './utils.js';

export const getMessagesController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    if (!groupId) {
      res.fail('Identyfikator grupy jest wymagany', [
        { code: 'MISSING_GROUP_ID', message: 'Identyfikator grupy jest wymagany', field: 'groupId' }
      ]);
      return;
    }

    const group = await Group.findOne({
      _id: groupId,
      members: userId
    });

    if (!group) {
      res.fail('Brak dostępu do czatu grupy', [
        { code: 'NOT_GROUP_MEMBER', message: 'Brak dostępu do czatu grupy' }
      ], 403);
      return;
    }

    const [messages, total] = await Promise.all([
      Message.find({ groupId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'username avatar')
        .lean(),
      Message.countDocuments({ groupId })
    ]);

    const formattedMessages = messages.map(message => ({
      ...message,
      isAuthor: message.author._id.toString() === userId,
      reactions: formatReactions(message.reactions, userId),
      hasReported: hasUserReported(message.reports, userId)
    } as MessageWithUserInfo));

    const bulkOps = messages
      .filter(msg => !msg.readBy?.some(item => item.userId.toString() === userId))
      .map(msg => ({
        updateOne: {
          filter: { _id: msg._id },
          update: {
            $addToSet: {
              readBy: {
                userId,
                readAt: new Date()
              }
            }
          }
        }
      }));

    if (bulkOps.length > 0) {
      await Message.bulkWrite(bulkOps);
    }

    res.paginated(
      formattedMessages.reverse(),
      page,
      limit,
      total,
      'Wiadomości zostały pobrane'
    );
  } catch (error) {
    next(error);
  }
}; 