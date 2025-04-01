import { Document } from 'mongoose';

export function safeArrayUpdate<T extends Document, V>(
  document: T,
  fieldName: string,
  filterFn?: (item: any) => boolean,
  newItem?: V
): void {
  const currentArray = document.get(fieldName) || [];
  
  let newArray = [...currentArray];
  
  if (filterFn) {
    newArray = newArray.filter(filterFn);
  }
  
  if (newItem) {
    newArray.push(newItem);
  }
  
  document.set(fieldName, newArray);
}

export function addReaction(document: Document, userId: string, emoji: string): void {
  safeArrayUpdate(
    document,
    'reactions',
    (r) => r.userId.toString() !== userId,
    { userId, emoji, createdAt: new Date() }
  );
}

export function addReport(document: Document, userId: string, reason: string): void {
  safeArrayUpdate(
    document,
    'reports',
    null,
    { userId, reason, createdAt: new Date(), status: 'pending' }
  );
}

export function addReadStatus(document: Document, userId: string): void {
  safeArrayUpdate(
    document,
    'readBy',
    (r) => r.userId.toString() !== userId,
    { userId, readAt: new Date() }
  );
} 