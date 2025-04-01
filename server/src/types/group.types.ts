import { Document, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  avatar?: string;
}

export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  tags: string[];
  owner: Types.ObjectId | IUser;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupMember extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  group: Types.ObjectId | IGroup;
  role: GroupRole;
  createdAt: Date;
  updatedAt: Date;
}

export type GroupRole = 'owner' | 'admin' | 'member';

export interface GroupWithUserInfo extends Omit<IGroup, 'members'> {
  members: IGroupMember[];
  isMember: boolean;
  isOwner: boolean;
  role: GroupRole | null;
  joinedAt: Date | null;
}

export interface GroupQueryOptions {
  userId?: string;
  limit?: number;
  page?: number;
  tag?: string;
  search?: string;
}

export interface GroupResponse {
  group: GroupWithUserInfo;
}

export interface GroupsResponse {
  groups: GroupWithUserInfo[];
  total: number;
  page?: number;
  limit?: number;
  hasNextPage?: boolean;
}

export interface GroupCreateData {
  name: string;
  description?: string;
  tags?: string[];
  userId: string;
}

export interface GroupUpdateData {
  name?: string;
  description?: string;
  tags?: string[];
}

export interface GroupMembershipData {
  userId: string;
  groupId: string;
  role?: GroupRole;
}

export interface MembershipChangeResult {
  success: boolean;
  message: string;
  group?: GroupWithUserInfo;
} 