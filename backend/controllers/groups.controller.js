import { Group } from '../models/group.model.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getGroupsController = async (req, res, next) => {
  try {
    const userId = req.user?.userId;

    const [groups, user] = await Promise.all([
      Group.find()
        .sort({ lastActive: -1 })
        .populate('members', 'username avatar'),
      userId ? User.findById(userId)
        .populate({
          path: 'groups.groupId',
          select: 'name membersCount image lastActive description'
        }) : null
    ]);

    const formattedGroups = groups.map(group => ({
      ...group.toObject(),
      isMember: userId ? group.members.some(member => member._id.toString() === userId) : false,
      membersCount: group.members.length
    }));

    const userGroups = user?.groups
      .filter(membership => membership.groupId != null)
      .map(membership => ({
        _id: membership.groupId._id,
        name: membership.groupId.name,
        membersCount: membership.groupId.membersCount,
        image: membership.groupId.image,
        description: membership.groupId.description,
        lastActive: membership.groupId.lastActive,
        joinedAt: membership.joinedAt,
        role: membership.role,
        notifications: membership.notifications
      })) || [];

    if (user && user.groups.length !== userGroups.length) {
      user.groups = user.groups.filter(membership => membership.groupId != null);
      await user.save();
    }

    res.json({
      groups: formattedGroups,
      userGroups: userGroups
    });
  } catch (error) {
    next(error);
  }
};


export const createGroupController = async (req, res, next) => {
  try {
    const { name, description, tags } = req.body;
    const userId = req.user.userId;

    if (!name || !description) {
      throw new ValidationError('Nazwa i opis grupy są wymagane');
    }

    const existingGroup = await Group.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, 'i')
      }
    });

    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }

    const group = new Group({
      name,
      description,
      tags: tags || [],
      members: [userId],
      membersCount: 1,
      lastActive: new Date()
    });

    await group.save();

    const populatedGroup = await Group.findById(group._id)
      .populate('members', 'username avatar');

    res.status(201).json(populatedGroup);
  } catch (error) {
    next(error);
  }
};

export const joinGroupController = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    const [group, user] = await Promise.all([
      Group.findById(groupId),
      User.findById(userId)
    ]);

    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    if (!user) {
      throw new ValidationError('Użytkownik nie istnieje');
    }

    const isMember = group.members.includes(userId);
    const userGroupIndex = user.groups.findIndex(g => g.groupId.toString() === groupId);

    if (isMember) {
      group.members = group.members.filter(id => id.toString() !== userId);
      group.membersCount = Math.max(0, group.membersCount - 1);

      if (userGroupIndex !== -1) {
        user.groups.splice(userGroupIndex, 1);
      }

      // Jeśli po usunięciu członków ich liczba wynosi 0, usuń grupę
      if (group.membersCount === 0) {
        await Group.findByIdAndDelete(groupId);
      } else {
        group.lastActive = new Date();
        await group.save();
      }
    } else {
      group.members.push(userId);
      group.membersCount += 1;

      const membershipDetails = {
        groupId: group._id,
        joinedAt: new Date(),
        role: group.members.length === 1 ? 'admin' : 'member',
        notifications: true,
        lastActivity: new Date()
      };

      user.groups.push(membershipDetails);
      group.lastActive = new Date();
      await group.save();
    }

    await user.save();

    const populatedGroup = await Group.findById(group._id)
      .populate('members', 'username avatar');

    const membershipDetails = !isMember ? 
      await User.findById(userId)
        .select('groups')
        .populate('groups.groupId', 'name membersCount image')
        .then(u => u.groups.find(g => g.groupId._id.toString() === groupId)) 
      : null;

    res.json({
      ...populatedGroup?.toObject(),
      isMember: !isMember,
      membershipDetails
    });
  } catch (error) {
    next(error);
  }
};

export const checkGroupName = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    const existingGroup = await Group.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, 'i')
      }
    });

    if (existingGroup) {
      return res.status(409).json({
        message: 'Grupa o takiej nazwie już istnieje',
        available: false
      });
    }

    res.json({
      message: 'Nazwa jest dostępna',
      available: true
    });
  } catch (error) {
    next(error);
  }
}; 