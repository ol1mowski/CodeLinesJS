import { FaUsers, FaCode, FaComments, FaTrophy } from "react-icons/fa";

export const communityStats = [
  {
    title: "Aktywni Użytkownicy",
    value: "2,500+",
    Icon: FaUsers,
    description: "Programistów uczących się razem",
  },
  {
    title: "Rozwiązane Zadania",
    value: "15,000+",
    Icon: FaCode,
    description: "Przesłanych rozwiązań",
  },
  {
    title: "Dyskusje",
    value: "5,000+",
    Icon: FaComments,
    description: "Wymiana wiedzy i doświadczeń",
  },
  {
    title: "Zdobyte Osiągnięcia",
    value: "8,000+",
    Icon: FaTrophy,
    description: "Odblokowane odznaki i nagrody",
  },
];

export const topUsers = [
  {
    name: "Anna Kowalska",
    points: 15420,
    badges: [
      { icon: "⭐", title: "Top Contributor" },
      { icon: "💎", title: "Code Master" },
      { icon: "🚀", title: "Fast Learner" },
    ],
  },
  {
    name: "Jan Nowak",
    points: 14250,
    badges: [
      { icon: "⭐", title: "Top Contributor" },
      { icon: "🔥", title: "Hot Streak" },
    ],
  },
  {
    name: "Marta Wiśniewska",
    points: 13800,
    badges: [
      { icon: "💎", title: "Code Master" },
      { icon: "⚡", title: "Quick Solver" },
    ],
  },
]; 