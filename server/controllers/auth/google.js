import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../../models/user.model.js';
import { LearningPath } from '../../models/index.js';
import { generateToken, sendWelcomeEmail } from './utils.js';

export const googleAuth = async (req, res, next) => {
  try {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

    const { credential, rememberMe } = req.body;

    if (!credential) {
      return res.status(400).json({
        status: 'error',
        message: 'Brak danych uwierzytelniających Google'
      });
    }

    let decodedToken;
    try {
      decodedToken = jwt.decode(credential);

      if (!decodedToken) {
        return res.status(400).json({
          status: 'error',
          message: 'Nieprawidłowy token Google'
        });
      }
    } catch (decodeError) {
      return res.status(400).json({
        status: 'error',
        message: 'Nie można zdekodować tokenu Google',
        error: decodeError.message
      });
    }

    const { email, name, picture, sub } = decodedToken;

    if (!email || !sub) {
      return res.status(400).json({
        status: 'error',
        message: 'Brak wymaganych danych w tokenie Google (email lub sub)'
      });
    }

    try {
      let user = await User.findOne({
        $or: [
          { email },
          { googleId: sub }
        ]
      });

      if (!user) {
        try {
          const defaultLearningPath = await LearningPath.findOne({ isDefault: true }) ||
            await LearningPath.findOne({}) ||
            { _id: new mongoose.Types.ObjectId() };

          const baseUsername = name?.split(' ')[0]?.toLowerCase() || email.split('@')[0];
          let username = baseUsername;
          let counter = 1;

          while (await User.findOne({ username })) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
          const hashedPassword = await bcryptjs.hash(randomPassword, 10);

          const newUserData = {
            email,
            username,
            password: hashedPassword,
            avatar: picture,
            isEmailVerified: true,
            accountType: 'google',
            googleId: sub,
            profile: {
              displayName: name || username,
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
                name: 'Użytkownik Google',
                icon: '🌐',
                earnedAt: new Date(),
                description: 'Odznaka za rejestrację przez Google'
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
              learningPaths: [
                {
                  pathId: defaultLearningPath._id,
                  status: "active",
                  progress: {
                    completedLessons: [],
                    totalLessons: defaultLearningPath.totalLessons || 0,
                    lastActivity: new Date(),
                    startedAt: new Date(),
                    completedAt: '',
                  }
                }
              ],
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
            resetPasswordToken: '',
            resetPasswordExpires: '',
            lastLogin: new Date(),
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          };

          const result = await mongoose.connection.collection('users').insertOne(newUserData);

          user = await User.findById(result.insertedId);

          if (!user) {
            throw new Error('Nie udało się utworzyć użytkownika Google');
          }

          try {
            await sendWelcomeEmail(user);
          } catch (emailError) {
            console.error('Błąd wysyłania emaila powitalnego:', emailError);
          }
        } catch (createError) {
          return res.status(400).json({
            status: 'error',
            message: 'Nie udało się utworzyć konta Google',
            error: createError.message
          });
        }
      } else if (user.accountType !== 'google') {
        await mongoose.connection.collection('users').updateOne(
          { _id: user._id },
          {
            $set: {
              accountType: 'google',
              googleId: sub,
              isEmailVerified: true,
              avatar: picture || user.avatar,
              updatedAt: new Date()
            }
          }
        );

        user = await User.findById(user._id);
      } else {
        await mongoose.connection.collection('users').updateOne(
          { _id: user._id },
          {
            $set: {
              lastLogin: new Date(),
              updatedAt: new Date()
            }
          }
        );
      }

      const expiresIn = rememberMe ? '30d' : '24h';
      const token = generateToken(user, expiresIn);

      return res.status(200).json({
        status: 'success',
        token,
        expiresIn,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          profile: user.profile,
          preferences: user.preferences,
          stats: user.stats
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Wystąpił błąd podczas logowania przez Google',
        error: error.message
      });
    }
  } catch (error) {
    next(error);
  }
}; 