export interface Message {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  groupId: string;
  createdAt: string;
  isEdited?: boolean;
  readBy: Array<{
    userId: string;
    readAt: string;
  }>;
}

export interface MessagesResponse {
  status: 'success';
  data: {
    messages: Message[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      hasNextPage: boolean;
    };
  };
}
