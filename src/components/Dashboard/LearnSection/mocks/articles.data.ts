import type { Article } from "../types/article.types";

export const articles: Article[] = [
  {
    id: "1",
    title: "Wprowadzenie do async/await w JavaScript",
    description: "Poznaj podstawy asynchronicznego programowania w JavaScript z wykorzystaniem async/await.",
    content: "...", // Pełna treść artykułu
    readTime: "5 min",
    type: "tutorial",
    difficulty: "beginner",
    author: {
      name: "Jan Kowalski",
      avatar: "/avatars/jan-kowalski.jpg"
    },
    publishDate: "2024-03-15",
    tags: ["async/await", "ES6+", "promises"]
  },
  {
    id: "2",
    title: "Zaawansowane wzorce projektowe w JS",
    description: "Odkryj najpopularniejsze wzorce projektowe i ich implementacje w JavaScript.",
    content: "...",
    readTime: "12 min",
    type: "guide",
    difficulty: "advanced",
    author: {
      name: "Anna Nowak",
      avatar: "/avatars/anna-nowak.jpg"
    },
    publishDate: "2024-03-10",
    tags: ["patterns", "architecture", "best practices"]
  },
]; 