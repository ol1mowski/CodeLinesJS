export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Nieautoryzowany dostęp',
  NOT_FOUND: 'Nie znaleziono zasobu',
  INTERNAL_SERVER_ERROR: 'Wewnętrzny błąd serwera',
  VALIDATION_ERROR: 'Błąd walidacji danych',
  FORBIDDEN: 'Dostęp zabroniony'
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Zasób został utworzony',
  UPDATED: 'Zasób został zaktualizowany',
  DELETED: 'Zasób został usunięty'
};

export const APP_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MIN_PASSWORD_LENGTH: 8
}; 