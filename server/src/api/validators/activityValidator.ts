// @ts-nocheck
import { ValidationError } from "../../utils/errors.js";

interface ActivityData {
  points: number;
  challenges: number;
  timeSpent: number;
}

export function validateActivityData(data: any): ActivityData {
  const { points = 0, challenges = 0, timeSpent = 0 } = data;
  
  if (typeof points !== "number" || points < 0) {
    throw new ValidationError("Nieprawidłowa wartość punktów");
  }

  if (typeof challenges !== "number" || challenges < 0) {
    throw new ValidationError("Nieprawidłowa wartość wyzwań");
  }

  if (typeof timeSpent !== "number" || timeSpent < 0) {
    throw new ValidationError("Nieprawidłowa wartość czasu");
  }

  return { points, challenges, timeSpent };
} 