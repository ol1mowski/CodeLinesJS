import { RegexChallenge } from '../types/regexRaider.types';

export const regexChallenges: RegexChallenge[] = [
  {
    id: 1,
    text: "Email: john.doe@example.com, Kontakt: alice.smith@company.co.uk",
    task: "Znajdź wszystkie adresy e-mail",
    correctRegex: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}"
  },
  {
    id: 2,
    text: "Numery telefonów: 123-456-789, 987-654-321, 555-555-555",
    task: "Znajdź numery telefonów w formacie XXX-XXX-XXX",
    correctRegex: "\\d{3}-\\d{3}-\\d{3}"
  },
  {
    id: 3,
    text: "Kody pocztowe: 00-001 Warszawa, 12-345 Kraków, 54-321 Wrocław",
    task: "Znajdź kody pocztowe w formacie XX-XXX",
    correctRegex: "\\d{2}-\\d{3}"
  }
]; 