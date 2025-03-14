# Konfiguracja CI/CD dla projektu CodeLinesJS

Ten dokument zawiera instrukcje dotyczące konfiguracji ciągłej integracji i wdrażania (CI/CD) dla projektu CodeLinesJS przy użyciu GitHub Actions.

## Przegląd procesu CI/CD

Proces CI/CD składa się z następujących etapów:

1. **Testowanie i linting** - sprawdzanie jakości kodu
2. **Budowanie aplikacji** - kompilacja i przygotowanie do wdrożenia
3. **Wdrażanie na środowisko testowe** - automatyczne wdrażanie na środowisko testowe z gałęzi `develop`
4. **Wdrażanie na produkcję** - automatyczne wdrażanie na produkcję z gałęzi `main`

## Konfiguracja GitHub Actions

Plik konfiguracyjny GitHub Actions znajduje się w `.github/workflows/ci-cd.yml`. Workflow jest uruchamiany automatycznie przy:
- Push do gałęzi `main` lub `develop`
- Pull request do gałęzi `main` lub `develop`

## Konfiguracja sekretów

Aby skonfigurować wdrażanie na Vercel, należy dodać następujące sekrety w ustawieniach repozytorium GitHub:

1. `VERCEL_TOKEN` - token API Vercel
2. `VERCEL_ORG_ID` - ID organizacji Vercel
3. `VERCEL_PROJECT_ID` - ID projektu Vercel

### Jak uzyskać te wartości:

1. Zainstaluj Vercel CLI: `npm i -g vercel`
2. Uruchom `vercel login` i zaloguj się do swojego konta
3. Uruchom `vercel link` w katalogu projektu
4. Wartości zostaną zapisane w pliku `.vercel/project.json`

## Alternatywne opcje wdrażania

Jeśli nie używasz Vercel, możesz dostosować sekcję wdrażania w pliku `.github/workflows/ci-cd.yml` do swojego dostawcy hostingu:

### Netlify

```yaml
- name: Wdrażanie na Netlify
  uses: netlify/actions/cli@master
  with:
    args: deploy --prod
  env:
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### AWS S3 + CloudFront

```yaml
- name: Konfiguracja AWS
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: eu-central-1

- name: Wdrażanie na S3
  run: aws s3 sync ./out s3://nazwa-twojego-bucketa/ --delete

- name: Invalidacja CloudFront
  run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Testowanie lokalne

Możesz przetestować workflow lokalnie przed wdrożeniem, używając [act](https://github.com/nektos/act):

```bash
# Instalacja act
brew install act  # macOS
# lub
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash  # Linux

# Uruchomienie workflow
act push
```

## Monitorowanie i debugowanie

Możesz monitorować wykonanie workflow w zakładce "Actions" w repozytorium GitHub. W przypadku problemów, sprawdź logi dla poszczególnych kroków. 