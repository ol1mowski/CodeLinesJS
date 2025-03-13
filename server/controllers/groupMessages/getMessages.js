import { Message } from '../../models/message.model.js';
import { Group } from '../../models/group.model.js';

const groupReactions = (reactions = []) => {
  const summary = {};
  reactions.forEach(reaction => {
    if (!summary[reaction.emoji]) {
      summary[reaction.emoji] = 0;
    }
    summary[reaction.emoji]++;
  });
  return Object.entries(summary).map(([emoji, count]) => ({ emoji, count }));
};

export const getMessagesController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const group = await Group.findOne({
      _id: groupId,
      members: userId
    });

    if (!group) {
      return res.status(403).json({
        status: 'error',
        message: 'Brak dostępu do czatu grupy'
      });
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
      reactions: {
        summary: groupReactions(message.reactions || []),
        userReactions: (message.reactions || [])
          .filter(r => r.userId.toString() === userId)
          .map(r => r.emoji)
      },
      hasReported: (message.reports || []).some(r => r.userId.toString() === userId) || false
    }));

    await Message.updateMany(
      { 
        groupId,
        'readBy.userId': { $ne: userId }
      },
      {
        $addToSet: {
          readBy: {
            userId,
            readAt: new Date()
          }
        }
      }
    );

    const hasNextPage = skip + messages.length < total;

    res.json({
      status: 'success',
      data: {
        messages: formattedMessages.reverse(),
        pagination: {
          page,
          limit,
          total,
          hasNextPage
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 