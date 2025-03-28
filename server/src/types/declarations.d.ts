// Deklaracje dla modułów, które nie mają definicji typów
declare module '*.js';

// Deklaracja dla bcryptjs
declare module 'bcryptjs' {
  export function genSalt(rounds?: number): Promise<string>;
  export function hash(data: string, salt: string | number): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
  export function compareSync(data: string, encrypted: string): boolean;
  export function hashSync(data: string, salt: string | number): string;
  export function genSaltSync(rounds?: number): string;
}

// Dodatkowe deklaracje dla innych typów plików
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