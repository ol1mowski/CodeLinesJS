import { Container } from "../components/UI/Container/Container.component";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Polityka Prywatności | CodeLinesJS</title>
        <meta name="description" content="Polityka prywatności CodeLinesJS - dowiedz się, jak chronimy Twoje dane osobowe." />
      </Helmet>
      <div className="bg-gradient-to-b from-dark via-dark-medium to-dark min-h-screen py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-dark-light/30 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-js/10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-js pb-4">
              Polityka Prywatności
            </h1>
            
            <div className="space-y-8 text-gray-200">
              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">1. Wprowadzenie</h2>
                <p className="mb-3">
                  Witamy w CodeLinesJS. Ochrona Twoich danych osobowych jest dla nas priorytetem. Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób gromadzimy, używamy, udostępniamy i chronimy Twoje dane podczas korzystania z naszej platformy edukacyjnej.
                </p>
                <p>
                  Korzystając z naszej strony internetowej i usług, akceptujesz praktyki opisane w niniejszej Polityce Prywatności.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">2. Jakie dane zbieramy</h2>
                <p className="mb-3">Możemy zbierać następujące rodzaje danych osobowych:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dane identyfikacyjne:</strong> imię, nazwisko, adres e-mail, nazwa użytkownika.</li>
                  <li><strong>Dane profilowe:</strong> zdjęcie profilowe, biografia, preferencje.</li>
                  <li><strong>Dane edukacyjne:</strong> postępy w nauce, wyniki quizów, ukończone lekcje.</li>
                  <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, urządzenie, system operacyjny.</li>
                  <li><strong>Dane o użytkowaniu:</strong> informacje o tym, jak korzystasz z naszej platformy.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">3. Jak wykorzystujemy Twoje dane</h2>
                <p className="mb-3">Wykorzystujemy zebrane dane w następujących celach:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Świadczenie i personalizacja naszych usług edukacyjnych.</li>
                  <li>Śledzenie postępów w nauce i dostosowywanie materiałów edukacyjnych.</li>
                  <li>Komunikacja z Tobą w sprawach związanych z kontem i usługami.</li>
                  <li>Poprawa i rozwój naszej platformy edukacyjnej.</li>
                  <li>Zapewnienie bezpieczeństwa i ochrona przed oszustwami.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">4. Udostępnianie danych</h2>
                <p className="mb-3">
                  Nie sprzedajemy Twoich danych osobowych stronom trzecim. Możemy jednak udostępniać dane w następujących okolicznościach:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dostawcy usług:</strong> współpracujemy z zaufanymi dostawcami usług, którzy pomagają nam w prowadzeniu platformy (np. hosting, analityka).</li>
                  <li><strong>Wymogi prawne:</strong> gdy jest to wymagane przez prawo lub w odpowiedzi na ważny proces prawny.</li>
                  <li><strong>Ochrona:</strong> gdy jest to konieczne do ochrony naszych praw, własności lub bezpieczeństwa.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">5. Twoje prawa</h2>
                <p className="mb-3">
                  Zgodnie z przepisami o ochronie danych osobowych, masz prawo do:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dostępu do swoich danych osobowych.</li>
                  <li>Sprostowania nieprawidłowych danych.</li>
                  <li>Usunięcia danych (prawo do bycia zapomnianym).</li>
                  <li>Ograniczenia przetwarzania danych.</li>
                  <li>Przenoszenia danych.</li>
                  <li>Sprzeciwu wobec przetwarzania danych.</li>
                </ul>
                <p className="mt-3">
                  Aby skorzystać z tych praw, skontaktuj się z nami pod adresem: privacy@codelinesjs.pl
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">6. Bezpieczeństwo danych</h2>
                <p>
                  Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieuprawnionym dostępem, utratą lub zniszczeniem. Regularnie przeglądamy i aktualizujemy nasze procedury bezpieczeństwa.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">7. Pliki cookie</h2>
                <p>
                  Używamy plików cookie i podobnych technologii, aby poprawić doświadczenie użytkownika, analizować ruch na stronie i personalizować treści. Możesz zarządzać preferencjami dotyczącymi plików cookie w ustawieniach swojej przeglądarki.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">8. Zmiany w Polityce Prywatności</h2>
                <p>
                  Możemy aktualizować naszą Politykę Prywatności w odpowiedzi na zmiany prawne lub w naszych praktykach. O istotnych zmianach poinformujemy Cię za pośrednictwem e-maila lub powiadomienia na naszej stronie.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">9. Kontakt</h2>
                <p>
                  Jeśli masz pytania dotyczące naszej Polityki Prywatności lub przetwarzania Twoich danych, skontaktuj się z nami pod adresem: privacy@codelinesjs.pl
                </p>
              </section>

              <div className="pt-6 border-t border-js/10 text-sm text-gray-400">
                <p>Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy; 