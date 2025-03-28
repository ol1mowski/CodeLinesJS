import { Group } from '../../../models/group.model.js';
import { GroupMember } from '../../../models/groupMember.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

export const createGroupController = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { name, description, tags } = req.body;

    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    if (name.length < 3 || name.length > 50) {
      throw new ValidationError('Nazwa grupy musi mieć od 3 do 50 znaków');
    }

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }

    const newGroup = new Group({
      name,
      description,
      tags: tags || [],
      owner: userId,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newGroup.save();

    const newMember = new GroupMember({
      user: userId,
      group: newGroup._id,
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newMember.save();

    newGroup.members.push(newMember._id);
    await newGroup.save();

    const populatedGroup = await Group.findById(newGroup._id)
      .populate('owner', 'username avatar')
      .populate('members', 'username avatar')
      .lean();

    res.status(201).json({
      status: 'success',
      message: 'Grupa została utworzona pomyślnie',
      data: {
        group: {
          ...populatedGroup,
          isMember: true,
          isOwner: true,
          role: 'owner',
          joinedAt: newMember.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 