# CodeLinesJS - Client

## Konfiguracja Husky

Projekt używa Husky do automatyzacji kontroli jakości kodu. Husky uruchamia automatycznie:

- **pre-commit**: Sprawdza i formatuje kod za pomocą ESLint i Prettier przed każdym commitem
- **pre-push**: Uruchamia testy przed każdym pushem do repozytorium

### Instalacja Husky w głównym katalogu projektu

Ponieważ projekt składa się z katalogów `client` i `server`, a commity wykonywane są z katalogu głównego, należy zainstalować Husky w katalogu głównym:

```bash
# Uruchom ten skrypt z katalogu client
node husky-setup.mjs
```

Skrypt ten:
1. Tworzy katalog .husky w katalogu głównym projektu (../)
2. Konfiguruje hooki Git dla całego repozytorium
3. Tworzy inteligentne skrypty, które automatycznie wykrywają zmiany w katalogach client i server
4. Uruchamia odpowiednie narzędzia (lint-staged, testy) tylko dla zmienionych komponentów

### Jak działa inteligentne wykrywanie zmian

Skonfigurowane hooki:
- Podczas commitu uruchamiają ESLint i Prettier tylko dla tych podkatalogów projektu (client/server), które zostały zmienione
- Podczas pusha uruchamiają testy tylko dla tych podkatalogów projektu (client/server), które zostały zmienione

Dzięki temu proces kontroli jakości kodu jest szybszy, ponieważ nie weryfikuje niepotrzebnie wszystkich części projektu.

### Sprawdzenie czy Husky działa

Aby sprawdzić czy Husky działa:

1. Przejdź do katalogu głównego projektu:
   ```bash
   cd ..
   ```

2. Wprowadź zmianę w dowolnym pliku w katalogu `client` lub `server`

3. Spróbuj zrobić commit:
   ```bash
   git add .
   git commit -m "Test commit"
   ```

Jeśli zobaczysz komunikaty o uruchomieniu lint-staged dla zmienionego katalogu, Husky działa poprawnie.

### Tymczasowe pominięcie hooków

Jeśli potrzebujesz pominąć hooki Husky (nie zalecane):

```bash
git commit -m "commit message" --no-verify
git push --no-verify
```

## Rozwój projektu

Aby uruchomić projekt w trybie deweloperskim:

```bash
npm run dev
```

## Testy

Aby uruchomić testy:

```bash
npm run test
``` 