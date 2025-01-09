import { useQuery } from '@tanstack/react-query';
import { Group } from '../types/groups.types';

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'React Masters',
    description: 'Grupa dla zaawansowanych programistów React',
    image: 'https://i.pravatar.cc/150?u=react_masters',
    membersCount: 1250,
    postsCount: 450,
    lastActive: new Date('2024-03-10T15:00:00'),
    isJoined: false,
    tags: ['react', 'javascript', 'frontend']
  },
  {
    id: '2',
    name: 'TypeScript Community',
    description: 'Wszystko o TypeScript i typowaniu w JavaScript',
    membersCount: 890,
    postsCount: 345,
    tags: ['typescript', 'javascript'],
    isJoined: true,
    lastActive: new Date('2024-03-15T09:15:00'),
    owner: {
      id: '2',
      name: 'Jan Nowak',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  }
];

export const useGroups = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockGroups;
    }
  });

  return {
    groups: data,
    isLoading
  };
}; 