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
    
    if (!messageId) {
      res.fail('Identyfikator wiadomości jest wymagany', [
        { code: 'MISSING_MESSAGE_ID', message: 'Identyfikator wiadomości jest wymagany', field: 'messageId' }
      ]);
      return;
    }
    
    if (!groupId) {
      res.fail('Identyfikator grupy jest wymagany', [
        { code: 'MISSING_GROUP_ID', message: 'Identyfikator grupy jest wymagany', field: 'groupId' }
      ]);
      return;
    }

    if (!reaction) {
      res.fail('Emoji jest wymagane', [
        { code: 'MISSING_REACTION', message: 'Emoji jest wymagane', field: 'reaction' }
      ]);
      return;
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId
    });

    if (!message) {
      res.fail('Wiadomość nie istnieje', [
        { code: 'MESSAGE_NOT_FOUND', message: 'Wiadomość nie istnieje' }
      ], 404);
      return;
    }

    addReaction(message, userId, reaction);
    await message.save();

    const updatedMessage = await Message.findById(messageId)
      .populate('author', 'username avatar')
      .lean();

    res.success(
      { message: updatedMessage },
      'Reakcja została dodana'
    );
  } catch (error) {
    next(error);
  }
}; 