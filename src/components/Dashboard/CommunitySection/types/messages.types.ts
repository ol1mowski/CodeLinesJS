export type MessageReaction = {
  _id: string;
  emoji: string;
  userId: string;
  username: string;
};

export type Message = {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  isEdited?: boolean;
  reactions: MessageReaction[];
}; 