// @ts-nocheck
import 'nodemailer';

declare module 'nodemailer' {
  interface SentMessageInfo {
    previewUrl?: string;
  }
} 