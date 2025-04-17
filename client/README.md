# CodeLinesJS - Client

## Konfiguracja Husky

Projekt używa Husky do automatyzacji kontroli jakości kodu. Husky uruchamia automatycznie:

- **pre-commit**: Sprawdza i formatuje kod za pomocą ESLint i Prettier przed każdym commitem
- **pre-push**: Uruchamia testy przed każdym pushem do repozytorium

### Rozwiązanie problemu z `.git can't be found`

Ponieważ folder `client` jest podkatalogiem głównego repozytorium Git (`.git` znajduje się w katalogu nadrzędnym), standardowa instalacja Husky może nie działać. W takim przypadku należy użyć specjalnego skryptu konfiguracyjnego:

```bash
# Uruchom ten skrypt z katalogu client
node husky-setup.mjs
```

Skrypt ten:
1. Tworzy odpowiednie pliki hooków w katalogu `.husky`
2. Konfiguruje Git do używania tych hooków
3. Dostosowuje ścieżki tak, aby hooki działały z podkatalogiem projektu

### Sprawdzenie czy Husky działa

Aby sprawdzić czy Husky działa:

1. Wprowadź zmianę w dowolnym pliku w katalogu `client`
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