import { FaUsers, FaCode, FaStar, FaTrophy, FaGithub } from "react-icons/fa";

export const stats = [
  {
    icon: FaUsers,
    label: "Społeczność",
    mainValue: "5,234",
    subValue: "+156 w tym tygodniu",
    trend: "+12%",
    details: [
      { label: "Aktywni", value: "3,421" },
      { label: "Online", value: "642" }
    ]
  },
  {
    icon: FaCode,
    label: "Rozwiązania",
    mainValue: "12,456",
    subValue: "Średnio 45/dzień",
    trend: "+8%",
    details: [
      { label: "Zaakceptowane", value: "89%" },
      { label: "Code Review", value: "2,341" }
    ]
  },
  {
    icon: FaGithub,
    label: "Projekty",
    mainValue: "1,289",
    subValue: "Aktywne repozytoria",
    trend: "+15%",
    details: [
      { label: "Współpraca", value: "456" },
      { label: "Pull Requests", value: "892" }
    ]
  }
];

export const topUsers = [
  { name: "Michał K.", points: "2,345", avatar: "👨‍💻", badge: FaTrophy },
  { name: "Anna W.", points: "2,156", avatar: "👩‍💻", badge: FaStar },
  { name: "Tomek L.", points: "1,987", avatar: "🧑‍💻", badge: FaStar }
]; 