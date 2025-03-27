import { FaUsers, FaCode, FaComments, FaStar, FaFire, FaGem } from "react-icons/fa";
import { IconType } from "react-icons";

export type StatsDataType = {
  icon: IconType;
  label: string;
  mainValue: string;
  subValue: string;
  trend: string;
  details: Array<{ label: string; value: string }>;
};

export type LeaderboardUserType = {
  name: string;
  points: string;
  avatar: string;
  badge: IconType;
};

export const stats: StatsDataType[] = [
  {
    icon: FaUsers,
    label: "Grupy Programistyczne",
    mainValue: "10+",
    subValue: "Dołącz lub utwórz własną grupę tematyczną",
    trend: "+12%",
    details: [
      { label: "Wzrost tygodniowy", value: "8%" },
      { label: "Aktywność", value: "Wysoka" },
    ],
  },
  {
    icon: FaComments,
    label: "Rozmowy Czatowe",
    mainValue: "Bez limitów",
    subValue: "Komunikacja w czasie rzeczywistym z innymi programistami",
    trend: "+15%",
    details: [
      { label: "Nowych czatów", value: "24" },
      { label: "Aktywność", value: "Wysoka" },
    ],
  },
  {
    icon: FaCode,
    label: "Tablica Społeczności",
    mainValue: "Dostępna",
    subValue: "Dziel się kodem i pytaj o rozwiązania",
    trend: "+9%",
    details: [
      { label: "Nowe posty", value: "18" },
      { label: "Aktywność", value: "Średnia" },
    ],
  },
];

export const topUsers: LeaderboardUserType[] = [
  {
    name: "Anna Kowalska",
    points: "15420",
    avatar: "👩‍💻",
    badge: FaStar,
  },
  {
    name: "Jan Nowak",
    points: "14250",
    avatar: "👨‍💻",
    badge: FaFire,
  },
  {
    name: "Marta Wiśniewska",
    points: "13800",
    avatar: "👩‍💻",
    badge: FaGem,
  },
]; 