import { ValidationError } from '../utils/errors.js';

export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email i hasło są wymagane'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Hasło musi mieć co najmniej 6 znaków'
    });
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: 'Email jest wymagany'
    });
  }

  next();
};

export const validateStats = (req, res, next) => {
  const { 
    experiencePoints, 
    completedChallenges, 
    averageScore, 
    totalTimeSpent,
  } = req.body;

  const errors = [];

  if (experiencePoints !== undefined && (
    !Number.isInteger(experiencePoints) || 
    experiencePoints < 0
  )) {
    errors.push('Nieprawidłowa wartość punktów doświadczenia');
  }

  if (completedChallenges !== undefined && (
    !Number.isInteger(completedChallenges) || 
    completedChallenges < 0
  )) {
    errors.push('Nieprawidłowa liczba ukończonych wyzwań');
  }

  if (averageScore !== undefined && (
    typeof averageScore !== 'number' || 
    averageScore < 0 || 
    averageScore > 100
  )) {
    errors.push('Nieprawidłowa wartość średniego wyniku');
  }

  if (totalTimeSpent !== undefined && (
    !Number.isInteger(totalTimeSpent) || 
    totalTimeSpent < 0
  )) {
    errors.push('Nieprawidłowa wartość czasu nauki');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  next();
};
