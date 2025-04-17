# CodeLinesJS - Client

## Konfiguracja Husky

Projekt używa Husky do automatyzacji kontroli jakości kodu. Husky uruchamia automatycznie:

- **pre-commit**: Sprawdza i formatuje kod za pomocą ESLint i Prettier przed każdym commitem
- **pre-push**: Uruchamia testy przed każdym pushem do repozytorium

### Inicjalizacja Husky po sklonowaniu repozytorium

Po sklonowaniu repozytorium, należy wykonać:

```bash
npm install
npm run prepare
```

To zainicjalizuje hooki git dla Husky.

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