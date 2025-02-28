export type Comment = {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
};

export type CommentFormData = {
  content: string;
}; 