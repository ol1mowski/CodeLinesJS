export interface SavedCode {
  id: string;
  code: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface SaveCodeDto {
  code: string;
  title: string;
} 