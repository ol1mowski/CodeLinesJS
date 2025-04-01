import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { Group } from '../../../../models/group.model.js';
import { 
  AuthRequest, 
  MessageController,
  MessageActionResponse
} from './types.js';


export const deleteMessageController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId, messageId } = req.params;
    const userId = req.user.userId;

    const [message, group] = await Promise.all([
      Message.findById(messageId),
      Group.findById(groupId)
    ]);

    if (!message) {
      res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
      return;
    }

    const isAuthor = message.author.toString() === userId;
    const isAdmin = group?.members[0].toString() === userId;

    if (!isAuthor && !isAdmin) {
      res.status(403).json({
        status: 'error',
        message: 'Nie masz uprawnień do usunięcia tej wiadomości'
      });
      return;
    }

    await Message.findByIdAndDelete(messageId);

    const response: MessageActionResponse = {
      status: 'success',
      message: 'Wiadomość została usunięta'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}; 