import { Message } from '../../../../models/message.model.js';

export const reportMessageController = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { reason } = req.body;
    const userId = req.user.userId;

    if (!reason) {
      return res.status(400).json({
        status: 'error',
        message: 'Powód zgłoszenia jest wymagany'
      });
    }

    const message = await Message.findOne({
      _id: messageId,
      groupId
    });

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje'
      });
    }

    const hasReported = message.reports && message.reports.some(
      r => r.userId.toString() === userId
    );

    if (hasReported) {
      return res.status(400).json({
        status: 'error',
        message: 'Już zgłosiłeś tę wiadomość'
      });
    }

    if (!message.reports) {
      message.reports = [];
    }

    message.reports.push({
      userId,
      reason,
      reportedAt: new Date()
    });

    await message.save();

    res.json({
      status: 'success',
      message: 'Wiadomość została zgłoszona'
    });
  } catch (error) {
    next(error);
  }
}; 