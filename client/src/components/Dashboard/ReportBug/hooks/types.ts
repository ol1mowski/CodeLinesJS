export type FormData = {
  title: string;
  description: string;
  category: string;
  email: string;
};

export type FormErrors = {
  title?: string;
  description?: string;
  category?: string;
  email?: string;
}; 