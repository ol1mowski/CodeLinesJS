import { FaUser, FaLock, FaCog, FaTrash } from "react-icons/fa";

export const menuItems = [
  { id: "profile" as const, label: "Profil", icon: FaUser },
  { id: "security" as const, label: "Bezpieczeństwo", icon: FaLock },
  { id: "preferences" as const, label: "Preferencje", icon: FaCog },
  { id: "delete" as const, label: "Usuń konto", icon: FaTrash },
] as const; 