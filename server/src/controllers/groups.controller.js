import { getGroups as getGroupsService, joinGroup as joinGroupService } from '../services/groups.service.js';

export const getGroups = async (req, res) => {
  try {
    const groups = await getGroupsService();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await joinGroupService(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join group' });
  }
}; 