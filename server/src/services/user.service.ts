// @ts-nocheck
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { LearningPath } from '../models/index.js';
import { AuthError } from '../utils/errors.js';
import { IUser } from '../types/user.types.js';
import { EmailService } from './email.service.js';
import { TokenService } from './token.service.js';


export class UserService {
  async createUser(email: string, password: string, username: string): Promise<IUser> {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      throw new AuthError('Użytkownik już istnieje');
    }
    
    try {
      const learningPaths = await LearningPath.find({});
      const defaultLearningPath = learningPaths.length > 0 ? learningPaths[0] : null;

      const userData = {
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
                totalLessons: 'totalLessons' in defaultLearningPath ? defaultLearningPath.totalLessons : 0,
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
      };
      
      console.log('Przygotowano dane dla nowego użytkownika:', {
        email: userData.email,
        username: userData.username,
        passwordLength: userData.password.length
      });
      
      const user = await User.create(userData);
      console.log(`Utworzono użytkownika z ID: ${user._id}`);
      
      return user;
    } catch (error) {
      console.error('Błąd podczas tworzenia użytkownika:', error);
      throw error;
    }
  }

  sanitizeUser(user: IUser) {
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      profile: user.profile,
      preferences: user.preferences,
      stats: user.stats,
      accountType: user.accountType,
      role: user.role || 'user'
    };
  }

  async handleGoogleAuth(
    credential: string, 
    rememberMe: boolean,
    tokenService: TokenService,
    emailService: EmailService
  ) {
    try {
      if (!credential) {
        throw new Error('Brak danych uwierzytelniających Google');
      }

      const decodedToken = tokenService.decodeGoogleToken(credential);
      if (!decodedToken) {
        throw new Error('Nieprawidłowy token Google');
      }

      const { email, name, picture, sub } = decodedToken;
      console.log(`Próba logowania Google: ${email}, sub: ${sub?.substring(0, 10)}...`);

      if (!email || !sub) {
        throw new Error('Brak wymaganych danych w tokenie Google (email lub sub)');
      }

      let user = await User.findOne({
        $or: [
          { email },
          { googleId: sub }
        ]
      });

      if (user) {
        user.lastLogin = new Date();
        // @ts-ignore - pole googleId istnieje w modelu ale nie jest wykrywane poprawnie
        user.googleId = sub;
        await user.save();

        const expiresIn = rememberMe ? '30d' : '24h';
        const token = tokenService.generateToken(user, expiresIn);
        console.log(`Zalogowano użytkownika Google: ${user.username} (${user._id})`);

        return {
          token,
          isNewUser: false,
          user: this.sanitizeUser(user)
        };
      }

      
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
        const hashedPassword = await bcryptjs.hash(randomPassword, 12);

        const newUser = await User.create({
          email,
          username,
          password: hashedPassword,
          avatar: picture,
          googleId: sub,
          isEmailVerified: true,
          accountType: 'google',
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
                  totalLessons: 'totalLessons' in defaultLearningPath ? defaultLearningPath.totalLessons : 0,
                  lastActivity: new Date(),
                  startedAt: new Date(),
                  completedAt: new Date()
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
          lastLogin: new Date(),
          isActive: true
        });


        try {
          await emailService.sendWelcomeEmail(newUser);
        } catch (emailError) {
          console.error('Błąd wysyłania emaila powitalnego:', emailError);
        }

        const expiresIn = rememberMe ? '30d' : '24h';
        const token = tokenService.generateToken(newUser, expiresIn);

        return {
          token,
          isNewUser: true,
          user: this.sanitizeUser(newUser)
        };
      } catch (createError) {
        console.error('Błąd tworzenia użytkownika Google:', createError);
        throw new Error(`Nie udało się utworzyć konta: ${createError.message}`);
      }
    } catch (error) {
      console.error('Błąd autoryzacji Google:', error);
      throw error;
    }
  }
} 