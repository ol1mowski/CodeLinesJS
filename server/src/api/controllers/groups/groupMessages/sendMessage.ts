import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { Group } from '../../../../models/group.model.js';
import { 
  AuthRequest, 
  MessageController,
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
      res.fail('Treść wiadomości jest wymagana', [
        { code: 'MISSING_CONTENT', message: 'Treść wiadomości jest wymagana', field: 'content' }
      ]);
      return;
    }
    
    const group = await Group.findOne({
      _id: groupId,
      members: userId
    });

    if (!group) {
      res.fail('Nie możesz wysyłać wiadomości w tej grupie', [
        { code: 'NOT_GROUP_MEMBER', message: 'Nie możesz wysyłać wiadomości w tej grupie' }
      ], 403);
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

    res.success(
      { message: populatedMessage as unknown as MessageDocument },
      'Wiadomość została wysłana',
      201
    );
  } catch (error) {
    next(error);
  }
}; 