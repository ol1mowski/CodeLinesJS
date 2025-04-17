# CodeLinesJS - Client

## Konfiguracja Husky

Projekt używa Husky do automatyzacji kontroli jakości kodu. Husky uruchamia automatycznie:

- **pre-commit**: Sprawdza i formatuje kod za pomocą ESLint i Prettier przed każdym commitem
- **pre-push**: Uruchamia testy przed każdym pushem do repozytorium

### Inicjalizacja Husky po sklonowaniu repozytorium

Po sklonowaniu repozytorium, należy wykonać:

```bash
npm install
```

Jeśli hooki nie działają po instalacji, można je zainstalować ręcznie:

```bash
# Wersja 1: Użyj skryptu instalacyjnego
node .husky/install-husky.js

# Wersja 2: Wykonaj ręcznie komendy
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/pre-push "npm run test"
```

Na systemach Unix/Linux/Mac należy dodatkowo nadać uprawnienia do wykonania:

```bash
chmod +x .husky/pre-commit .husky/pre-push
```

### Sprawdzenie czy Husky działa

Aby sprawdzić czy Husky działa:

1. Wprowadź zmianę w dowolnym pliku
2. Spróbuj zrobić commit:
```bash
git add .
git commit -m "Test commit"
```

Jeśli zobaczysz, że uruchamia się lint-staged przed commitem, Husky działa poprawnie.

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