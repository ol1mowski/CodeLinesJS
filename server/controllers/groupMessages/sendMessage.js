import { Message } from '../../models/message.model.js';
import { Group } from '../../models/group.model.js';

export const sendMessageController = async (req, res, next) => {
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