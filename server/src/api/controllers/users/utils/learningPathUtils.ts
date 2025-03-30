// @ts-nocheck
export const calculateLearningPathsProgress = (stats, learningPaths) => {
  return learningPaths.map(path => {
    const userPath = stats.learningPaths?.find(
      up => up.pathId.toString() === path._id.toString()
    );

    const completedLessons = userPath?.progress?.completedLessons?.length || 0;
    const totalLessons = path.totalLessons;

    return {
      pathId: path._id,
      title: path.title,
      progress: {
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
        status: userPath?.status || 'locked'
      }
    };
  });
}; 