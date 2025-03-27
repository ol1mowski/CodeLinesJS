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
    const defaultLearningPath = learningPaths.length > 0 ? learningPaths[0] : null;

    const user = await User.create({
      email,
      password,
      username,
      accountType: 'local',
      isEmailVerified: false,
      profile: {
        displayName: username,
        bio: '',
        socialLinks: {
          github: '',
          linkedin: '',
          twitter: ''
        }
      },
      preferences: {
        emailNotifications: true,
        theme: 'dark',
        language: 'pl'
      },
      groups: [],
      stats: {
        points: 0,
        level: 1,
        xp: 0,
        streak: 0,
        pointsToNextLevel: 1000,
        bestStreak: 0,
        lastActive: new Date(),
        experiencePoints: 0,
        nextLevelThreshold: 1000,
        completedChallenges: 0,
        currentStreak: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        badges: [{
          name: 'Nowy użytkownik',
          icon: '🎉',
          earnedAt: new Date(),
          description: 'Odznaka za dołączenie do platformy'
        }],
        unlockedFeatures: [],
        chartData: {
          daily: [{
            date: new Date().toISOString().split('T')[0],
            points: 0,
            timeSpent: 0
          }],
          progress: [{
            name: 'Początek nauki',
            progress: 0,
            timeSpent: 0
          }]
        },
        learningPaths: defaultLearningPath ? [
          {
            pathId: defaultLearningPath._id,
            status: "active",
            progress: {
              completedLessons: [],
              totalLessons: defaultLearningPath.totalLessons || 0,

              lastActivity: new Date(),
              startedAt: new Date(),
              completedAt: new Date()
            }
          }
        ] : [],
        categories: [
          {
            name: "javascript",
            progress: 0,
            level: 1
          },
          {
            name: "react",
            progress: 0,
            level: 1
          },
          {
            name: "node",
            progress: 0,
            level: 1
          },
          {
            name: "database",
            progress: 0,
            level: 1
          },
          {
            name: "testing",
            progress: 0,
            level: 1
          }
        ],
        daily: [
          {
            date: new Date().toISOString().split('T')[0],
            points: 0,
            challenges: 0
          }
        ]
      },
      lastLogin: new Date(),
      isActive: true
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
        isNewUser: true,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
}; 