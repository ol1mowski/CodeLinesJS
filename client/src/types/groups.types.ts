export type Group = {
  id: string;
  name: string;
  description: string;
  image?: string;
  membersCount: number;
  postsCount: number;
  tags: string[];
  isJoined: boolean;
  lastActive: Date | string;
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
}; 