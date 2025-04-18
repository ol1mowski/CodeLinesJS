import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { Group } from '../../../../models/group.model.js';
import { 
  AuthRequest, 
  MessageController
} from './types.js';


export const deleteMessageController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId, messageId } = req.params;
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

    const [message, group] = await Promise.all([
      Message.findById(messageId),
      Group.findById(groupId)
    ]);

    if (!message) {
      res.fail('Wiadomość nie istnieje', [
        { code: 'MESSAGE_NOT_FOUND', message: 'Wiadomość nie istnieje' }
      ], 404);
      return;
    }

    const isAuthor = message.author.toString() === userId;
    const isAdmin = group?.members[0].toString() === userId;

    if (!isAuthor && !isAdmin) {
      res.fail('Nie masz uprawnień do usunięcia tej wiadomości', [
        { code: 'UNAUTHORIZED', message: 'Nie masz uprawnień do usunięcia tej wiadomości' }
      ], 403);
      return;
    }

    await Message.findByIdAndDelete(messageId);

    res.success(
      { deletedMessageId: messageId },
      'Wiadomość została usunięta'
    );
  } catch (error) {
    next(error);
  }
}; 