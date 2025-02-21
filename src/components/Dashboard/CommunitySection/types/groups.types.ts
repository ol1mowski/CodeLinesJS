export interface GroupMember {
  _id: string;
  username: string;
  avatar?: string;
}

export interface Group {
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
}

export interface GroupsResponse {
  allGroups: Group[];
  userGroups: Group[];
} 