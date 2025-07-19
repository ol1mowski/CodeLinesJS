// Komunikaty błędów autoryzacji
export const AUTH_ERROR_MESSAGES = {
  // Token resetowania hasła
  INVALID_TOKEN: 'Nieprawidłowy lub wygasły token resetowania hasła. Sprawdź, czy link jest poprawny lub spróbuj ponownie zresetować hasło.',
  MISSING_TOKEN: 'Brak tokenu resetowania hasła. Sprawdź, czy link jest poprawny.',
  TOKEN_TOO_SHORT: 'Token resetowania hasła jest nieprawidłowy. Sprawdź, czy link jest poprawny.',
  
  // Hasła
  PASSWORDS_NOT_MATCH: 'Hasła nie są identyczne. Upewnij się, że oba pola zawierają to samo hasło.',
  PASSWORD_TOO_SHORT: 'Hasło musi mieć co najmniej 8 znaków.',
  PASSWORD_REQUIREMENTS: 'Hasło musi zawierać co najmniej 8 znaków, w tym jedną wielką literę, jedną małą literę i jedną cyfrę.',
  
  // Sukces
  PASSWORD_CHANGED: 'Hasło zostało pomyślnie zmienione.',
  PASSWORD_CHANGED_REDIRECT: 'Hasło zostało pomyślnie zmienione. Za chwilę zostaniesz przekierowany do strony logowania.',
  EMAIL_SENT: 'Link do resetowania hasła został wysłany na Twój adres email.',
  
  // Ogólne błędy
  UNKNOWN_ERROR: 'Wystąpił nieznany błąd. Spróbuj ponownie później.',
  NETWORK_ERROR: 'Wystąpił błąd połączenia. Sprawdź połączenie z internetem.',
  SERVER_ERROR: 'Wystąpił błąd serwera. Spróbuj ponownie później.',
  
  // Logowanie
  INVALID_CREDENTIALS: 'Nieprawidłowe dane logowania.',
  GOOGLE_LOGIN_ERROR: 'Nie udało się uzyskać tokenu uwierzytelniającego z Google. Spróbuj ponownie.',
  GOOGLE_LOGIN_FAILED: 'Nieznany błąd logowania przez Google. Spróbuj ponownie później.',
  
  // Rejestracja
  USER_EXISTS: 'Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje w systemie',
  REGISTRATION_ERROR: 'Wystąpił błąd podczas rejestracji',
  
  // Reset hasła
  RESET_PASSWORD_ERROR: 'Wystąpił błąd podczas resetowania hasła',
  RESET_PASSWORD_SENDING_ERROR: 'Wystąpił błąd podczas wysyłania linku resetującego hasło',
} as const;

// Komunikaty sukcesu
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Zalogowano pomyślnie',
  REGISTER_SUCCESS: 'Konto zostało utworzone pomyślnie',
  LOGOUT_SUCCESS: 'Wylogowano pomyślnie',
  PASSWORD_RESET_EMAIL_SENT: 'Email z linkiem do resetowania hasła został wysłany',
  PASSWORD_CHANGED: 'Hasło zostało zmienione pomyślnie',
} as const;

// Komunikaty walidacji
export const AUTH_VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email jest wymagany',
  PASSWORD_REQUIRED: 'Hasło jest wymagane',
  USERNAME_REQUIRED: 'Nazwa użytkownika jest wymagana',
  CONFIRM_PASSWORD_REQUIRED: 'Potwierdzenie hasła jest wymagane',
  CURRENT_PASSWORD_REQUIRED: 'Aktualne hasło jest wymagane',
  NEW_PASSWORD_REQUIRED: 'Nowe hasło jest wymagane',
  PRIVACY_POLICY_REQUIRED: 'Musisz zaakceptować politykę prywatności',
} as const;

// Komunikaty informacyjne
export const AUTH_INFO_MESSAGES = {
  REDIRECTING_TO_LOGIN: 'Za chwilę zostaniesz przekierowany do strony logowania.',
  GO_BACK_TO_LOGIN: 'Wróć do strony logowania',
  TRY_AGAIN: 'Spróbuj ponownie zresetować hasło',
  CHECK_EMAIL: 'Sprawdź swoją skrzynkę email',
} as const; 