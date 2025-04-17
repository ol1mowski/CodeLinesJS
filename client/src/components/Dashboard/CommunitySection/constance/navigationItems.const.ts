import { FaNewspaper, FaTrophy, FaUsers } from 'react-icons/fa';

export const navigationItems = [
  {
    id: '/',
    label: 'Aktualności',
    icon: FaNewspaper,
    path: '/dashboard/community/',
  },
  {
    id: 'ranking',
    label: 'Ranking',
    icon: FaTrophy,
    path: '/dashboard/community/ranking',
  },
  {
    id: 'groups',
    label: 'Grupy',
    icon: FaUsers,
    path: '/dashboard/community/groups',
  },
] as const;
