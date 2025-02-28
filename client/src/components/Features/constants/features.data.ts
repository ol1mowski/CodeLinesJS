import { FaGamepad, FaCode, FaTrophy, FaUsers } from "react-icons/fa";
import { IconType } from "react-icons";

type Feature = {
  title: string;
  description: string;
  Icon: IconType;
};

export const features: Feature[] = [
  {
    Icon: FaGamepad,
    title: "Interaktywna Nauka",
    description: "Ucz się JavaScript poprzez wciągającą grę i praktyczne wyzwania kodowania.",
  },
  {
    Icon: FaCode,
    title: "Wyzwania Kodowania",
    description: "Rozwiązuj różnorodne zadania programistyczne o rosnącym poziomie trudności.",
  },
  {
    Icon: FaTrophy,
    title: "System Osiągnięć",
    description: "Zdobywaj odznaki i punkty za ukończone wyzwania i postępy w nauce.",
  },
  {
    Icon: FaUsers,
    title: "Społeczność",
    description: "Dołącz do społeczności programistów i dziel się swoimi rozwiązaniami.",
  },
]; 