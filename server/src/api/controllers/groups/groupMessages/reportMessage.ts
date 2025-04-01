import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { 
  AuthRequest, 
  MessageController,
  MessageActionResponse
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

    if (!reason) {
      res.status(400).json({
        status: 'error',
        message: 'Powód zgłoszenia jest wymagany'
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

    const hasReported = message.reports && message.reports.some(
      r => r.userId.toString() === userId
    );

    if (hasReported) {
      res.status(400).json({
        status: 'error',
        message: 'Już zgłosiłeś tę wiadomość'
      });
      return;
    }

    addReport(message, userId, reason);
    await message.save();

    const response: MessageActionResponse = {
      status: 'success',
      message: 'Wiadomość została zgłoszona'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}; 