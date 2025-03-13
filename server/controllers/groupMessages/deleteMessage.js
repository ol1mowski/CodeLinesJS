import { Message } from '../../models/message.model.js';
import { Group } from '../../models/group.model.js';

export const deleteMessageController = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const userId = req.user.userId;

    const [message, group] = await Promise.all([
      Message.findById(messageId),
      Group.findById(groupId)
    ]);

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
    }

    const isAuthor = message.author.toString() === userId;
    const isAdmin = group.members[0].toString() === userId;

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Nie masz uprawnień do usunięcia tej wiadomości'
      });
    }

    await Message.findByIdAndDelete(messageId);

    res.json({
      status: 'success',
      message: 'Wiadomość została usunięta'
    });
  } catch (error) {
    next(error);
  }
}; 