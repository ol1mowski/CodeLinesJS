/**
 * Ten skrypt konfiguruje Husky dla projektów, gdzie folder .git znajduje się w katalogu nadrzędnym
 * Uruchom: node husky-setup.mjs
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  console.log('🔧 Konfigurowanie Husky dla projektu wielomodułowego...');
  
  // W ESM __dirname nie jest dostępne, musimy je stworzyć
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Utwórz katalog .husky, jeśli nie istnieje
  const huskyDir = path.join(__dirname, '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir, { recursive: true });
    console.log('✅ Utworzono katalog .husky');
  }

  // Absolutna ścieżka do katalogu głównego repozytorium (jeden poziom wyżej)
  const gitRoot = path.resolve(__dirname, '..');
  console.log(`🔍 Używam głównego katalogu repozytorium: ${gitRoot}`);

  // Utwórz skrypt pre-commit
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  fs.writeFileSync(preCommitPath, `#!/usr/bin/env sh
# Husky pre-commit hook
cd "${__dirname.replace(/\\/g, '/')}"
npx lint-staged
`, { encoding: 'utf8' });
  console.log('✅ Utworzono hook pre-commit');

  // Utwórz skrypt pre-push
  const prePushPath = path.join(huskyDir, 'pre-push');
  fs.writeFileSync(prePushPath, `#!/usr/bin/env sh
# Husky pre-push hook
cd "${__dirname.replace(/\\/g, '/')}"
npm run test
`, { encoding: 'utf8' });
  console.log('✅ Utworzono hook pre-push');

  // Ustaw uprawnienia (na systemach Unix)
  try {
    execSync(`chmod +x "${preCommitPath}" "${prePushPath}"`);
    console.log('✅ Ustawiono uprawnienia dla skryptów');
  } catch (e) {
    console.log('ℹ️ Pominięto ustawianie uprawnień (Windows)');
  }

  // Skonfiguruj Git do korzystania z hooków
  try {
    const hooksPath = path.relative(gitRoot, huskyDir);
    console.log(`🔗 Ustawiam hooks path: ${hooksPath}`);
    
    execSync(`git -C "${gitRoot}" config core.hooksPath ${hooksPath}`);
    console.log('✅ Skonfigurowano Git do korzystania z hooków Husky');
  } catch (error) {
    console.error('⚠️ Błąd podczas konfigurowania git hooks path:', error.message);
    console.log('\nAby ręcznie skonfigurować Git, wykonaj poniższą komendę w katalogu głównym repozytorium:');
    console.log(`\ngit config core.hooksPath ${path.relative(gitRoot, huskyDir)}\n`);
  }

  console.log('\n🎉 Konfiguracja Husky zakończona! Teraz możesz testować hooki Git.');
  console.log('📝 Aby przetestować pre-commit hook:');
  console.log('   git add .');
  console.log('   git commit -m "Test pre-commit hook"');
  console.log('\n📝 Aby przetestować pre-push hook:');
  console.log('   git push');
  
} catch (error) {
  console.error('⚠️ Wystąpił błąd podczas konfiguracji Husky:', error);
  process.exit(1);
} 