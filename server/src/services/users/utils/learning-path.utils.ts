export const calculateLearningPathsProgress = (stats: any, learningPaths: any[]) => {
  return learningPaths.map(path => {
    const userPath = stats?.learningPaths?.find(
      (up: any) => up.pathId.toString() === path._id.toString()
    );

    const completedLessons = userPath?.progress?.completedLessons?.length || 0;
    const totalLessons = path.totalLessons || 0;
    const percentage = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

    return {
      pathId: path._id,
      title: path.title,
      progress: {
        completed: completedLessons,
        total: totalLessons,
        percentage: percentage,
        status: userPath?.status || 'locked'
      }
    };
  });
};

export const calculateStatsSummary = (learningPaths: any[]) => {
  if (!learningPaths || !learningPaths.length) {
    return {
      totalPaths: 0,
      completedPaths: 0,
      inProgress: 0,
      averageCompletion: 0
    };
  }

  const completedPaths = learningPaths.filter(
    path => path.progress.status === 'completed'
  ).length;

  const inProgress = learningPaths.filter(
    path => path.progress.status === 'active'
  ).length;

  const sumCompletion = learningPaths.reduce(
    (sum, path) => sum + path.progress.percentage, 
    0
  );

  return {
    totalPaths: learningPaths.length,
    completedPaths,
    inProgress,
    averageCompletion: Math.round(sumCompletion / learningPaths.length)
  };
}; 