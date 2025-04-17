/**
 * Ten skrypt konfiguruje Husky dla głównego katalogu projektu
 * obejmując zarówno client jak i server
 * Uruchom: node husky-setup.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  console.log('🔧 Konfigurowanie Husky dla całego projektu CodeLinesJS...');
  
  // W ESM __dirname nie jest dostępne, musimy je stworzyć
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Katalog główny projektu (jeden poziom wyżej)
  const rootDir = path.resolve(__dirname, '..');
  console.log(`🔍 Katalog główny projektu: ${rootDir}`);
  
  // Utwórz katalog .husky w katalogu głównym
  const huskyDir = path.join(rootDir, '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir, { recursive: true });
    console.log('✅ Utworzono katalog .husky w katalogu głównym');
  }

  // Utwórz katalog _ jeśli nie istnieje
  const underscoreDir = path.join(huskyDir, '_');
  if (!fs.existsSync(underscoreDir)) {
    fs.mkdirSync(underscoreDir, { recursive: true });
  }

  // Utwórz plik husky.sh
  const huskyShPath = path.join(underscoreDir, 'husky.sh');
  fs.writeFileSync(huskyShPath, `#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi

  readonly husky_skip_init=1
  export husky_skip_init
  sh -e "$0" "$@"
  exitCode="$?"

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi

  exit $exitCode
fi
`, { encoding: 'utf8' });

  // Utwórz skrypt pre-commit który wykonuje lint-staged dla obu katalogów
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  fs.writeFileSync(preCommitPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Sprawdź zmiany w katalogu client
if git diff --cached --name-only | grep -q "^client/"; then
  echo "🔍 Znaleziono zmiany w katalogu client, uruchamiam lint-staged..."
  cd "${path.join(rootDir, 'client').replace(/\\/g, '/')}"
  npx lint-staged
  EXIT_CODE_CLIENT=$?
else
  EXIT_CODE_CLIENT=0
fi

# Sprawdź zmiany w katalogu server
if git diff --cached --name-only | grep -q "^server/"; then
  echo "🔍 Znaleziono zmiany w katalogu server, uruchamiam lint-staged..."
  cd "${path.join(rootDir, 'server').replace(/\\/g, '/')}"
  npx lint-staged
  EXIT_CODE_SERVER=$?
else
  EXIT_CODE_SERVER=0
fi

# Zakończ z błędem, jeśli którykolwiek proces się nie powiódł
if [ $EXIT_CODE_CLIENT -ne 0 ] || [ $EXIT_CODE_SERVER -ne 0 ]; then
  exit 1
fi

exit 0
`, { encoding: 'utf8' });
  console.log('✅ Utworzono hook pre-commit');

  // Utwórz skrypt pre-push
  const prePushPath = path.join(huskyDir, 'pre-push');
  fs.writeFileSync(prePushPath, `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Uruchom testy dla client
if git diff --name-only HEAD@{u}..HEAD | grep -q "^client/"; then
  echo "🧪 Uruchamiam testy dla client..."
  cd "${path.join(rootDir, 'client').replace(/\\/g, '/')}"
  npm run test
  EXIT_CODE_CLIENT=$?
else
  echo "ℹ️ Brak zmian w katalogu client, pomijam testy client"
  EXIT_CODE_CLIENT=0
fi

# Uruchom testy dla server
if git diff --name-only HEAD@{u}..HEAD | grep -q "^server/"; then
  echo "🧪 Uruchamiam testy dla server..."
  cd "${path.join(rootDir, 'server').replace(/\\/g, '/')}"
  npm run test
  EXIT_CODE_SERVER=$?
else
  echo "ℹ️ Brak zmian w katalogu server, pomijam testy server"
  EXIT_CODE_SERVER=0
fi

# Zakończ z błędem, jeśli którykolwiek proces się nie powiódł
if [ $EXIT_CODE_CLIENT -ne 0 ] || [ $EXIT_CODE_SERVER -ne 0 ]; then
  exit 1
fi

exit 0
`, { encoding: 'utf8' });
  console.log('✅ Utworzono hook pre-push');

  // Ustaw uprawnienia (na systemach Unix)
  try {
    execSync(`chmod +x "${huskyShPath}" "${preCommitPath}" "${prePushPath}"`);
    console.log('✅ Ustawiono uprawnienia dla skryptów');
  } catch (e) {
    console.log('ℹ️ Pominięto ustawianie uprawnień (Windows)');
  }

  // Skonfiguruj Git do korzystania z hooków
  try {
    execSync(`git -C "${rootDir}" config core.hooksPath .husky`);
    console.log('✅ Skonfigurowano Git do korzystania z hooków Husky w głównym katalogu');
  } catch (error) {
    console.error('⚠️ Błąd podczas konfigurowania git hooks path:', error.message);
    console.log('\nAby ręcznie skonfigurować Git, wykonaj poniższą komendę w katalogu głównym repozytorium:');
    console.log('\ngit config core.hooksPath .husky\n');
  }

  // Stwórz konfigurację lint-staged dla client jeśli brakuje
  const clientLintStagedPath = path.join(rootDir, 'client', 'package.json');
  if (fs.existsSync(clientLintStagedPath)) {
    const clientPackageJson = JSON.parse(fs.readFileSync(clientLintStagedPath, 'utf8'));
    if (!clientPackageJson['lint-staged']) {
      console.log('ℹ️ Brak konfiguracji lint-staged w client/package.json, dodaję...');
      clientPackageJson['lint-staged'] = {
        "src/**/*.{js,jsx,ts,tsx}": [
          "eslint --fix",
          "prettier --write"
        ],
        "src/**/*.{json,css,scss}": [
          "prettier --write"
        ]
      };
      fs.writeFileSync(clientLintStagedPath, JSON.stringify(clientPackageJson, null, 2), 'utf8');
      console.log('✅ Zaktualizowano client/package.json z konfiguracją lint-staged');
    }
  }

  // Stwórz konfigurację lint-staged dla server jeśli brakuje
  const serverLintStagedPath = path.join(rootDir, 'server', 'package.json');
  if (fs.existsSync(serverLintStagedPath)) {
    const serverPackageJson = JSON.parse(fs.readFileSync(serverLintStagedPath, 'utf8'));
    if (!serverPackageJson['lint-staged']) {
      console.log('ℹ️ Brak konfiguracji lint-staged w server/package.json, dodaję...');
      serverPackageJson['lint-staged'] = {
        "src/**/*.{js,ts}": [
          "eslint --fix",
          "prettier --write"
        ],
        "src/**/*.json": [
          "prettier --write"
        ]
      };
      fs.writeFileSync(serverLintStagedPath, JSON.stringify(serverPackageJson, null, 2), 'utf8');
      console.log('✅ Zaktualizowano server/package.json z konfiguracją lint-staged');
    }
  }

  console.log('\n🎉 Konfiguracja Husky zakończona! Hooki Git zostały zainstalowane w głównym katalogu projektu.');
  console.log('📝 Teraz możesz wykonywać commity z głównego katalogu, a hooki Husky będą sprawdzać kod w client i server.');
  console.log('\n📝 Aby przetestować pre-commit hook:');
  console.log('   cd .. && git add .');
  console.log('   git commit -m "Test pre-commit hook"');
  
} catch (error) {
  console.error('⚠️ Wystąpił błąd podczas konfiguracji Husky:', error);
  process.exit(1);
} 