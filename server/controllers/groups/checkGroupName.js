import { Group } from '../../models/group.model.js';
import { ValidationError } from '../../utils/errors.js';

export const checkGroupName = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
    }

    const existingGroup = await Group.findOne({ name });

    res.json({
      status: 'success',
      data: {
        isAvailable: !existingGroup,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
}; 