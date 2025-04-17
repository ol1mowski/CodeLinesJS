export const getAuthToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
};

export const saveAuthToken = (token: string, persistent: boolean = true): void => {
  if (persistent) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Błąd zapisywania do localStorage (${key}):`, error);
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (!serializedValue) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Błąd odczytywania z localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const saveToSessionStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Błąd zapisywania do sessionStorage (${key}):`, error);
  }
};

export const getFromSessionStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (!serializedValue) {
      return defaultValue;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Błąd odczytywania z sessionStorage (${key}):`, error);
    return defaultValue;
  }
};
