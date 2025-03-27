export type SavedCode = {
  id: string;
  code: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type SaveCodeDto ={
  code: string;
  title: string;
} 