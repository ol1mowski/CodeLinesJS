import { Group } from '../models/group.model.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';
import mongoose from 'mongoose';

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

    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError('Użytkownik nie istnieje');
    }

    const group = new Group({
      name,
      description,
      tags: tags || [],
      members: [userId],
      membersCount: 1,
      lastActive: new Date()
    });

    const membershipDetails = {
      groupId: group._id,
      joinedAt: new Date(),
      role: 'admin',
      notifications: true,
      lastActivity: new Date()
    };

    user.groups.push(membershipDetails);

    await Promise.all([
      group.save(),
      user.save()
    ]);

    const populatedGroup = await Group.findById(group._id)
      .populate('members', 'username avatar');

    res.status(201).json({
      ...populatedGroup.toObject(),
      isMember: true,
      membershipDetails,
      isAdmin: true
    });
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

export const getGroupById = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      throw new ValidationError('Nieprawidłowe ID grupy');
    }

    const [group, user] = await Promise.all([
      Group.findById(groupId)
        .populate('members', 'username avatar stats.level stats.points')
        .lean(),
      userId ? User.findById(userId).select('groups').lean() : null
    ]);


    if (!group) {
      throw new ValidationError('Grupa nie została znaleziona');
    }

    const isMember = group.members.some(member => member._id.toString() === userId);
    const userMembership = user?.groups?.find(g => g.groupId.toString() === groupId);

    const formattedGroup = {
      _id: group._id,
      name: group.name,
      description: group.description,
      tags: group.tags,
      membersCount: group.members.length,
      postsCount: group.postsCount,
      lastActive: group.lastActive,
      createdAt: group.createdAt,
      isMember,
      members: group.members.map(member => ({
        _id: member._id,
        username: member.username,
        level: member.stats?.level || 1,
        points: member.stats?.points || 0,
        isAdmin: member._id.toString() === group.members[0]._id.toString()
      })),
      userRole: userMembership?.role || null,
      joinedAt: userMembership?.joinedAt || null,
      notifications: userMembership?.notifications || false
    };

    res.json(formattedGroup);
  } catch (error) {
    next(error);
  }
};

export const updateGroupName = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;

    console.log(req.body);

    if (!name) {
      throw new ValidationError('Nazwa grupy jest wymagana');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const isAdmin = group.members[0].toString() === userId;
    if (!isAdmin) {
      throw new ValidationError('Nie masz uprawnień do edycji grupy');
    }

    const existingGroup = await Group.findOne({
      _id: { $ne: groupId },
      name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (existingGroup) {
      throw new ValidationError('Grupa o takiej nazwie już istnieje');
    }

    group.name = name;
    await group.save();

    res.json({
      message: 'Nazwa grupy została zaktualizowana',
      group: {
        _id: group._id,
        name: group.name
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroupTags = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { tags } = req.body;
    const userId = req.user.userId;

    if (!Array.isArray(tags)) {
      throw new ValidationError('Tagi muszą być tablicą');
    }

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const isAdmin = group.members[0].toString() === userId;
    if (!isAdmin) {
      throw new ValidationError('Nie masz uprawnień do edycji grupy');
    }

    const validTags = tags.filter(tag => 
      typeof tag === 'string' && 
      tag.length >= 2 && 
      tag.length <= 20
    );

    group.tags = validTags;
    await group.save();

    res.json({
      message: 'Tagi grupy zostały zaktualizowane',
      group: {
        _id: group._id,
        tags: group.tags
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.userId;

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const isAdmin = group.members[0].toString() === userId;
    if (!isAdmin) {
      throw new ValidationError('Nie masz uprawnień do usunięcia grupy');
    }

    await User.updateMany(
      { 'groups.groupId': groupId },
      { $pull: { groups: { groupId: groupId } } }
    );

    await Group.findByIdAndDelete(groupId);

    res.json({
      message: 'Grupa została usunięta',
      groupId
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { groupId, memberId } = req.params;
    const adminId = req.user.userId;

    const [group, member] = await Promise.all([
      Group.findById(groupId),
      User.findById(memberId)
    ]);

    if (!group) {
      return res.status(404).json({
        status: 'error',
        message: 'Grupa nie istnieje'
      });
    }

    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Użytkownik nie istnieje'
      });
    }

    const isAdmin = group.members[0].toString() === adminId;
    if (!isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Nie masz uprawnień do usuwania członków'
      });
    }

    if (memberId === group.members[0].toString()) {
      return res.status(400).json({
        status: 'error',
        message: 'Nie można usunąć założyciela grupy'
      });
    }

    if (!group.members.some(id => id.toString() === memberId)) {
      return res.status(404).json({
        status: 'error',
        message: 'Użytkownik nie jest członkiem grupy'
      });
    }

    group.members = group.members.filter(id => id.toString() !== memberId);
    group.membersCount = Math.max(0, group.membersCount - 1);
    member.groups = member.groups.filter(g => g.groupId.toString() !== groupId);

    await Promise.all([
      group.save(),
      member.save()
    ]);

    res.json({
      status: 'success',
      message: 'Użytkownik został usunięty z grupy',
      data: {
        removedMember: {
          _id: member._id,
          username: member.username
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Wystąpił błąd podczas usuwania członka grupy',
      error: error.message
    });
  }
}; 