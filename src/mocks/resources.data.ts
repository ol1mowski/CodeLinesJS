import { Resource } from "../types/learning.types";

export const resources: Resource[] = [
  {
    id: "mdn-js-guide",
    title: "JavaScript - Przewodnik MDN",
    description: "Kompleksowy przewodnik po JavaScript od Mozilla Developer Network.",
    url: "https://developer.mozilla.org/pl/docs/Web/JavaScript/Guide",
    type: "documentation",
    category: "Podstawy",
    difficulty: "beginner",
    isRecommended: true
  },
  {
    id: "mdn-js-reference",
    title: "Referencje JavaScript",
    description: "Szczegółowa dokumentacja wszystkich funkcji i metod JavaScript.",
    url: "https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference",
    type: "documentation",
    category: "Referencje",
    difficulty: "intermediate",
    isRecommended: false
  },
  {
    id: "mdn-js-tutorials",
    title: "Tutoriale JavaScript",
    description: "Praktyczne przykłady i ćwiczenia do nauki JavaScript.",
    url: "https://developer.mozilla.org/pl/docs/Web/JavaScript/Tutorials",
    type: "tutorial",
    category: "Praktyka",
    difficulty: "beginner",
    isRecommended: true
  }
]; 