import { useQuery } from '@tanstack/react-query';
import { Group } from '../types/groups.types';

const mockGroups: Group[] = [
  {
    id: '1',
    name: 'React Masters',
    description: 'Grupa dla pasjonatów React i nowoczesnego front-endu',
    image: 'https://picsum.photos/200',
    membersCount: 1234,
    postsCount: 567,
    tags: ['react', 'typescript', 'frontend'],
    isJoined: false,
    lastActive: new Date('2024-03-15T10:30:00'),
    owner: {
      id: '1',
      name: 'Anna Kowalska',
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
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