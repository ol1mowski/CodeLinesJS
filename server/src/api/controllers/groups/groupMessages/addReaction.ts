import { Message } from '../../../../models/message.model.js';

export const addReactionController = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { reaction } = req.body;
    const userId = req.user.userId;

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
        message: updatedMessage
      }
    });
  } catch (error) {
    next(error);
  }
}; 