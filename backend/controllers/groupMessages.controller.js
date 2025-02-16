import { Message } from '../models/message.model.js';
import { Group } from '../models/group.model.js';

export const getMessages = async (req, res, next) => {
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

export const sendMessage = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Treść wiadomości jest wymagana'
      });
    }

    const group = await Group.findOne({
      _id: groupId,
      members: userId
    });

    if (!group) {
      return res.status(403).json({
        status: 'error',
        message: 'Nie możesz wysyłać wiadomości w tej grupie'
      });
    }

    const message = await Message.create({
      groupId,
      author: userId,
      content,
      readBy: [{
        userId,
        readAt: new Date()
      }]
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('author', 'username avatar')
      .lean();

    res.status(201).json({
      status: 'success',
      data: {
        message: populatedMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const message = await Message.findOne({
      _id: messageId,
      groupId,
      author: userId
    });

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje lub nie masz uprawnień do jej edycji'
      });
    }

    message.content = content;
    message.isEdited = true;
    await message.save();

    const updatedMessage = await Message.findById(message._id)
      .populate('author', 'username avatar')
      .lean();

    res.json({
      status: 'success',
      data: {
        message: updatedMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const userId = req.user.userId;

    const [message, group] = await Promise.all([
      Message.findById(messageId),
      Group.findById(groupId)
    ]);

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
    }

    const isAuthor = message.author.toString() === userId;
    const isAdmin = group.members[0].toString() === userId;

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Nie masz uprawnień do usunięcia tej wiadomości'
      });
    }

    await Message.findByIdAndDelete(messageId);

    res.json({
      status: 'success',
      message: 'Wiadomość została usunięta'
    });
  } catch (error) {
    next(error);
  }
};

export const addReaction = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { reaction } = req.body;
    const userId = req.user.userId;

    console.log(req.body);
    

    if (!reaction) {
      return res.status(400).json({
        status: 'error',
        message: 'Emoji jest wymagane'
      });
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId
    });

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
    }

    message.reactions = message.reactions.filter(
      r => r.userId.toString() !== userId
    );

    message.reactions.push({
      emoji: reaction,
      userId
    });

    await message.save();

    const updatedMessage = await Message.findById(messageId)
      .populate('author', 'username avatar')
      .lean();

    res.json({
      status: 'success',
      data: {
        message: {
          ...updatedMessage,
          isAuthor: updatedMessage.author._id.toString() === userId,
          reactions: {
            summary: groupReactions(updatedMessage.reactions || []),
            userReactions: updatedMessage.reactions
              .filter(r => r.userId.toString() === userId)
              .map(r => r.emoji)
          }
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const reportMessage = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { reason, description } = req.body;
    const userId = req.user.userId;

    if (!reason) {
      return res.status(400).json({
        status: 'error',
        message: 'Powód zgłoszenia jest wymagany'
      });
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId
    });

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
    }

    const hasReported = message.reports.some(
      r => r.userId.toString() === userId
    );

    if (hasReported) {
      return res.status(400).json({
        status: 'error',
        message: 'Już zgłosiłeś tę wiadomość'
      });
    }

    message.reports.push({
      userId,
      reason,
      description,
      createdAt: new Date(),
      status: 'pending'
    });

    await message.save();

    res.json({
      status: 'success',
      message: 'Wiadomość została zgłoszona'
    });
  } catch (error) {
    next(error);
  }
};

const groupReactions = (reactions = []) => {
  if (!Array.isArray(reactions)) return {};
  return reactions.reduce((acc, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
    return acc;
  }, {});
}; 