import { User } from '../models/user.model.js';

export const getActiveUsers = async (req, res, next) => {
  try {
    const activeUsers = await User.find({ isActive: true })
      .select('username isActive _id')
      .lean();

    let usersToReturn = [...activeUsers];

    if (activeUsers.length < 5) {
      const additionalUsersNeeded = 8 - activeUsers.length;

      const inactiveUsers = await User.aggregate([
        { $match: { isActive: false } },
        { $sample: { size: additionalUsersNeeded } },
        { $project: { username: 1, isActive: 1, avatar: 1, _id: 1 } }
      ]);

      usersToReturn = [...activeUsers, ...inactiveUsers];
    }

    if (usersToReturn.length > 8) {
      usersToReturn = usersToReturn.slice(0, 8);
    }

    res.json({
      users: usersToReturn.map(user => ({
        username: user.username,
        isActive: user.isActive || false,
        _id: user._id
      })),
      totalActive: activeUsers.length
    });
  } catch (error) {
    next(error);
  }
}; 