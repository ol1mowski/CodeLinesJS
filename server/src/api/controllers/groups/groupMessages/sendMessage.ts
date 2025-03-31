import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { Group } from '../../../../models/group.model.js';
import { 
  AuthRequest, 
  MessageController,
  SendMessageResponse,
  MessageDocument
} from './types.js';

export const sendMessageController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content || content.trim().length === 0) {
      res.status(400).json({
        status: 'error',
        message: 'Treść wiadomości jest wymagana'
      });
      return;
    }
    
    const group = await Group.findOne({
      _id: groupId,
      members: userId
    });

    if (!group) {
      res.status(403).json({
        status: 'error',
        message: 'Nie możesz wysyłać wiadomości w tej grupie'
      });
      return;
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

    const response: SendMessageResponse = {
      status: 'success',
      data: {
        message: populatedMessage as unknown as MessageDocument
      }
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}; 