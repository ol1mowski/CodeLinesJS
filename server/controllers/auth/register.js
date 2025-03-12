import { User } from '../../models/user.model.js';
import { LearningPath } from '../../models/learningPath.model.js';
import { AuthError } from '../../utils/errors.js';
import { generateToken, sendWelcomeEmail } from './utils.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new AuthError('Użytkownik już istnieje');
    }

    const learningPaths = await LearningPath.find({});

    const user = await User.create({
      email,
      password,
      username,
      accountType: 'local',
      profile: {
        bio: '',
        socialLinks: {}
      },
      preferences: {
        emailNotifications: true,
        theme: 'dark',
        language: 'pl'
      },
      stats: {
        points: 0,
        completedLessons: [],
        lastActive: new Date(),
        learningPaths: [
          {
            pathId: learningPaths[0]._id,
            status: "active",
            progress: {
              completedLessons: [
                
              ],
              totalLessons: 0,
              lastLesson: '',
              lastActivity: new Date(),
              startedAt: new Date(),
              completedAt: new Date(),
            },
          },
        ],
      }
    });

    const token = generateToken(user);

    try {
      await sendWelcomeEmail(user);
    } catch (emailError) {
      console.error('Błąd wysyłania emaila powitalnego:', emailError);
    }

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isNewUser: true,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
}; 