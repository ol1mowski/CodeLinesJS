import { getGroups, joinGroup } from '../services/groups.service.js';

export const getGroupsController = async (req, res) => {
  try {
    const groups = await getGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};

export const joinGroupController = async (req, res) => {
  try {
    const { groupId } = req.params;
    await joinGroup(groupId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join group' });
  }
}; 