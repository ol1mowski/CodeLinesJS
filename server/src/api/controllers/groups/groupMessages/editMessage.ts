import { Response, NextFunction } from 'express';
import { Message } from '../../../../models/message.model.js';
import { 
  AuthRequest, 
  MessageController
} from './types.js';


export const editMessageController: MessageController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { groupId, messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;
    
    if (!content || content.trim().length === 0) {
      res.fail('Treść wiadomości jest wymagana', [
        { code: 'MISSING_CONTENT', message: 'Treść wiadomości jest wymagana', field: 'content' }
      ]);
      return;
    }
    
    if (!messageId) {
      res.fail('Identyfikator wiadomości jest wymagany', [
        { code: 'MISSING_MESSAGE_ID', message: 'Identyfikator wiadomości jest wymagany', field: 'messageId' }
      ]);
      return;
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId,
      author: userId
    });

    if (!message) {
      res.fail('Wiadomość nie istnieje lub nie masz uprawnień do jej edycji', [
        { code: 'MESSAGE_NOT_FOUND', message: 'Wiadomość nie istnieje lub nie masz uprawnień do jej edycji' }
      ], 404);
      return;
    }

    message.content = content;
    message.isEdited = true;
    await message.save();

    const updatedMessage = await Message.findById(message._id)
      .populate('author', 'username avatar')
      .lean();

    res.success(
      { message: updatedMessage },
      'Wiadomość została zaktualizowana'
    );
  } catch (error) {
    next(error);
  }
}; 