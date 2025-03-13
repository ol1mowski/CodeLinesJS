import { Lesson, LearningPath } from "../../models/index.js";
import { User } from "../../models/user.model.js";
import { ValidationError } from "../../utils/errors.js";
import { LevelService } from "../../services/level.service.js";

export const updateProgressController = async (req, res, next) => {
    try {
        const { lessonId } = req.body;
        const userId = req.user.userId;

        const lesson = await Lesson.findOne({ slug: lessonId });
        if (!lesson) throw new ValidationError("Lekcja nie znaleziona");

        const [user, learningPath] = await Promise.all([
            User.findById(userId),
            LearningPath.findOne({ lessons: { $in: [lesson._id] } }),
        ]);

        if (!user || !learningPath) {
            throw new ValidationError("Nie znaleziono użytkownika lub ścieżki nauki");
        }

        if (!user.stats.learningPaths) {
            user.stats.learningPaths = [];
        }

        let userPathIndex = user.stats.learningPaths.findIndex(
            path => path.pathId.toString() === learningPath._id.toString()
        );

        if (userPathIndex === -1) {
            user.stats.learningPaths.push({
                pathId: learningPath._id,
                status: "active",
                progress: {
                    completedLessons: [{
                        lessonId: lesson._id,
                        completedAt: new Date()
                    }],
                    totalLessons: learningPath.totalLessons,
                    lastLesson: lesson._id,
                    lastActivity: new Date(),
                    startedAt: new Date()
                }
            });
            userPathIndex = user.stats.learningPaths.length - 1;
        } else {
            const userPath = user.stats.learningPaths[userPathIndex];
            const isCompleted = userPath.progress.completedLessons.some(
                completedLesson => completedLesson.lessonId.toString() === lesson._id.toString()
            );

            if (isCompleted) {
                return res.status(400).json({ status: "error", message: "Lekcja została już ukończona" });
            }

            userPath.progress.completedLessons.push({
                lessonId: lesson._id,
                completedAt: new Date()
            });
            userPath.progress.lastLesson = lesson._id;
            userPath.progress.lastActivity = new Date();

            if (userPath.progress.completedLessons.length === learningPath.totalLessons) {
                userPath.status = "completed";
                userPath.progress.completedAt = new Date();
            }

            const earnedPoints = lesson.points || 0;
            const timeSpent = lesson.duration || 0;

            await LevelService.updateUserLevelAndStreak(userId, earnedPoints, {
                points: earnedPoints,
                challenges: 1,
                timeSpent: timeSpent
            });
        }

        user.markModified('stats.learningPaths');

        await user.save();

        const updatedUser = await User.findById(userId);
        const levelStats = LevelService.getUserLevelStats(updatedUser);
        const updatedPath = updatedUser.stats.learningPaths[userPathIndex];

        res.json({
            message: "Postęp zaktualizowany pomyślnie",
            stats: {
                points: levelStats.points,
                pointsRequired: levelStats.pointsToNextLevel,
                xp: updatedUser.stats.xp,
                level: levelStats.level,
                levelProgress: levelStats.progress,
                streak: updatedUser.stats.streak,
                bestStreak: updatedUser.stats.bestStreak,
                lastActive: updatedUser.stats.lastActive,
                pathProgress: {
                    completedLessons: updatedPath.progress.completedLessons.length,
                    totalLessons: learningPath.totalLessons,
                    percentage: Math.round(
                        (updatedPath.progress.completedLessons.length / learningPath.totalLessons) * 100
                    ),
                    status: updatedPath.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};


export const updateUserProgressController = async (req, res, next) => {
    try {
        const { points, challenges, timeSpent } = req.body;
        const userId = req.user.userId;

        if (typeof points !== 'number' || points < 0) {
            throw new ValidationError("Nieprawidłowa wartość punktów");
        }

        const update = await LevelService.updateUserLevelAndStreak(userId, points, {
            points,
            challenges: challenges || 0,
            timeSpent: timeSpent || 0
        });

        res.json({
            message: update.level.leveledUp
                ? `Punkty dodane! Awansowałeś na poziom ${update.level.level}!`
                : "Punkty użytkownika zaktualizowane pomyślnie",
            data: {
                userStats: {
                    points: update.level.points,
                    pointsRequired: update.level.pointsRequired,
                    xp: update.level.points,
                    level: update.level.level,
                    levelProgress: update.level.progress,
                    streak: update.streak.streak,
                    bestStreak: update.streak.bestStreak,
                    lastActive: new Date(),
                    leveledUp: update.level.leveledUp,
                    levelsGained: update.level.levelsGained
                },
                streak: {
                    current: update.streak.streak,
                    best: update.streak.bestStreak,
                    updated: update.streak.streakUpdated,
                    broken: update.streak.streakBroken
                }
            }
        });
    } catch (error) {
        next(error);
    }
};