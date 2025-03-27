import { Message } from '../../../../models/message.model.js';

export const editMessageController = async (req, res, next) => {
  try {
    const { groupId, messageId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const message = await Message.findOne({
      _id: messageId,
      groupId,
      author: userId
    });

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Wiadomość nie istnieje lub nie masz uprawnień do jej edycji'
      });
    }

    message.content = content;
    message.isEdited = true;
    await message.save();

    const updatedMessage = await Message.findById(message._id)
      .populate('author', 'username avatar')
      .lean();

    res.json({
      status: 'success',
      data: {
        message: updatedMessage
      }
    });
  } catch (error) {
    next(error);
  }
}; 