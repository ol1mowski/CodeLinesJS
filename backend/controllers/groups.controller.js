import { Group } from '../models/group.model.js';
import { ValidationError } from '../utils/errors.js';

export const getGroupsController = async (req, res, next) => {
  try {
    const groups = await Group.find()
      .sort({ lastActive: -1 })
      .populate('members', 'username avatar');
    res.json(groups);
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

    const group = await Group.findById(groupId);
    if (!group) {
      throw new ValidationError('Grupa nie istnieje');
    }

    const isMember = group.members.includes(userId);
    if (isMember) {
      group.members = group.members.filter(id => id.toString() !== userId);
      group.membersCount = Math.max(0, group.membersCount - 1);
    } else {
      group.members.push(userId);
      group.membersCount += 1;
    }

    group.lastActive = new Date();
    await group.save();

    const populatedGroup = await Group.findById(group._id)
      .populate('members', 'username avatar');

    res.json({
      ...populatedGroup.toObject(),
      isMember: !isMember
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