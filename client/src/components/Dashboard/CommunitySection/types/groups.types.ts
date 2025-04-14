export type GroupMember = {
  _id: string;
  username: string;
  avatar?: string;
}

export type Group = {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  lastActive: string;
  members: GroupMember[];
  membersCount: number;
  postsCount: number;
  isJoined?: boolean;
  image?: string;
  userRole?: string;
  createdAt?: string;
  isAdmin?: boolean;
  isMember?: boolean;
  role?: string;
  joinedAt?: string;
  updatedAt?: string;
}

export type GroupsResponse = {
  allGroups: Group[];
  userGroups: Group[];
} 