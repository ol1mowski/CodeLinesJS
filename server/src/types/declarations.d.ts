declare module 'bcryptjs' {
  export function genSalt(rounds?: number): Promise<string>;
  export function hash(data: string, salt: string | number): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
  export function hashSync(data: string, salt: string | number): string;
  export function genSaltSync(rounds?: number): string;
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'progress' {
  export * from './progress/index';
}

declare module 'reports' {
  export * from './reports/index';
}

declare module 'settings' {
  export * from './settings/index';
} 