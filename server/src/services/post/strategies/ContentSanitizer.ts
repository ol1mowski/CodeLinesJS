import { ISanitizer } from './ISanitizer.js';

export class ContentSanitizer implements ISanitizer {
  sanitize(content: string): string {
    if (!content) return '';
    
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/data:/gi, 'nodata:');
  }
} 