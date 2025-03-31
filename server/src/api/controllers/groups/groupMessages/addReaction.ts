import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { 
  AuthRequest, 
  MessageController
} from './types.js';
import { addReaction } from './helpers.js';


export const addReactionController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId, messageId } = req.params;
    const { reaction } = req.body;
    const userId = req.user.userId;

    if (!reaction) {
      res.status(400).json({
        status: 'error',
        message: 'Emoji jest wymagane'
      });
      return;
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId
    });

    if (!message) {
      res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
      return;
    }

    addReaction(message, userId, reaction);
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