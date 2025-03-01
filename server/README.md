# CodeLinesJS API

Backend API dla platformy CodeLinesJS do nauki JavaScript.

## Technologie

- Node.js
- Express.js
- MongoDB
- JWT do uwierzytelniania
- Nodemailer do wysyłania e-maili

## Wymagania

- Node.js 18.x lub nowszy
- MongoDB Atlas lub lokalny serwer MongoDB
- Konto Vercel (do wdrożenia)

## Konfiguracja lokalna

1. Sklonuj repozytorium
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Skopiuj plik `.env.example` do `.env` i uzupełnij zmienne środowiskowe
4. Uruchom serwer w trybie deweloperskim:
   ```bash
   npm run dev
   ```

## Wdrożenie na Vercel

### Przygotowanie projektu

Projekt jest już skonfigurowany do wdrożenia na Vercel. Kluczowe pliki konfiguracyjne:

- `vercel.json` - konfiguracja wdrożenia
- `package.json` - skrypty i zależności
- `.env.example` - szablon zmiennych środowiskowych

### Kroki wdrożenia

1. Zainstaluj Vercel CLI (opcjonalnie):
   ```bash
   npm i -g vercel
   ```

2. Zaloguj się do Vercel:
   ```bash
   vercel login
   ```

3. Wdróż projekt:
   ```bash
   vercel
   ```

4. Lub wdróż bezpośrednio z GitHub:
   - Połącz repozytorium z Vercel
   - Skonfiguruj zmienne środowiskowe w panelu Vercel
   - Wdróż projekt

### Zmienne środowiskowe na Vercel

W panelu Vercel dodaj następujące zmienne środowiskowe:

- `PORT` - port serwera (Vercel automatycznie przypisze port)
- `MONGODB_URI` - URI połączenia z MongoDB
- `FRONTEND_URL` - URL frontendu
- `NODE_ENV` - ustaw na `production`
- `JWT_SECRET` - tajny klucz do podpisywania tokenów JWT
- `JWT_EXPIRES_IN` - czas wygaśnięcia tokenów JWT
- `JWT_COOKIE_EXPIRES_IN` - czas wygaśnięcia ciasteczek JWT
- `EMAIL_HOST` - host serwera SMTP
- `EMAIL_PORT` - port serwera SMTP
- `EMAIL_USER` - nazwa użytkownika SMTP
- `EMAIL_PASSWORD` - hasło SMTP
- `EMAIL_FROM` - adres e-mail nadawcy
- `RATE_LIMIT_MAX` - maksymalna liczba zapytań
- `RATE_LIMIT_WINDOW_MS` - okno czasowe dla limitera zapytań

## Struktura projektu

- `config/` - pliki konfiguracyjne
- `controllers/` - kontrolery API
- `middleware/` - middleware Express
- `models/` - modele Mongoose
- `routes/` - trasy API
- `services/` - usługi biznesowe
- `utils/` - narzędzia pomocnicze
- `scripts/` - skrypty pomocnicze

## Endpointy API

### Autoryzacja
- `POST /api/auth/register` - rejestracja użytkownika
- `POST /api/auth/login` - logowanie
- `POST /api/auth/forgot-password` - resetowanie hasła
- `POST /api/auth/reset-password` - ustawienie nowego hasła
- `GET /api/auth/verify-token` - weryfikacja tokenu JWT

### Użytkownicy
- `GET /api/users/profile` - profil użytkownika
- `PUT /api/users/profile` - aktualizacja profilu

### Nauka
- `GET /api/learning-paths` - ścieżki nauki
- `GET /api/lessons` - lekcje
- `GET /api/progress` - postęp użytkownika

### Statystyki
- `GET /api/stats` - statystyki użytkownika
- `GET /api/ranking` - ranking użytkowników

## Licencja

ISC 