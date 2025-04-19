import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { 
  AuthRequest, 
  MessageController
} from './types.js';
import { addReport } from './helpers.js';


export const reportMessageController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId, messageId } = req.params;
    const { reason } = req.body;
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

    if (!reason) {
      res.fail('Powód zgłoszenia jest wymagany', [
        { code: 'MISSING_REASON', message: 'Powód zgłoszenia jest wymagany', field: 'reason' }
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

    const hasReported = message.reports && message.reports.some(
      r => r.userId.toString() === userId
    );

    if (hasReported) {
      res.fail('Już zgłosiłeś tę wiadomość', [
        { code: 'ALREADY_REPORTED', message: 'Już zgłosiłeś tę wiadomość' }
      ]);
      return;
    }

    addReport(message, userId, reason);
    await message.save();

    res.success(
      { reportedMessageId: messageId },
      'Wiadomość została zgłoszona'
    );
  } catch (error) {
    next(error);
  }
}; 