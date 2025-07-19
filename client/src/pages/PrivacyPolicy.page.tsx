import { Container } from '../components/UI/Container/Container.component';
import { motion } from 'framer-motion';
import { SEO } from '../utils/seo.util';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Polityka Prywatności"
        description="Polityka prywatności CodeLinesJS - dowiedz się, jak chronimy Twoje dane osobowe."
        type="website"
      />
      <div className="bg-gradient-to-b from-dark via-dark-medium to-dark min-h-screen py-16">
        <Container>
          <Link to="/">
            <span className="text-js flex items-center gap-2">
              <FaArrowLeft />
              <span>Wróć do strony głównej</span>
            </span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-dark-light/30 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-js/10 mt-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-js pb-4">
              Polityka prywatności
            </h1>

            <div className="space-y-8 text-gray-200">
              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">1. Informacje ogólne</h2>
                <p className="mb-3">
                  Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url:
                  codelinesjs.pl
                </p>
                <p className="mb-3">
                  Operatorem serwisu oraz Administratorem danych osobowych jest: Oliwier Markieiwcz
                  98-200, Sieradz
                </p>
                <p className="mb-3">
                  Adres kontaktowy poczty elektronicznej operatora: kontakt@codelinesjs.pl
                </p>
                <p className="mb-3">
                  Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych
                  podanych dobrowolnie w Serwisie.
                </p>
                <p className="mb-3">Serwis wykorzystuje dane osobowe w następujących celach:</p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li>Prowadzenie newslettera</li>
                  <li>Prowadzenie systemu komentarzy</li>
                  <li>Prowadzenie rozmów typu chat online</li>
                  <li>Prezentacja profil użytkownika innym użytkownikom</li>
                  <li>Obsługa zapytań przez formularz</li>
                  <li>Prezentacja oferty lub informacji</li>
                </ul>
                <p className="mb-3">
                  Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu
                  w następujący sposób:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone
                    do systemów Operatora.
                  </li>
                  <li>
                    Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. "ciasteczka").
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  2. Wybrane metody ochrony danych stosowane przez Operatora
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie
                    transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania,
                    wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być
                    odczytane jedynie na docelowym serwerze.
                  </li>
                  <li>
                    Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że
                    jedynie posiadający Operator klucz może je odczytać. Dzięki temu dane są
                    chronione na wypadek wykradzenia bazy danych z serwera.
                  </li>
                  <li>
                    Hasła użytkowników są przechowywane w postaci hashowanej. Funkcja hashująca
                    działa jednokierunkowo - nie jest możliwe odwrócenie jej działania, co stanowi
                    obecnie współczesny standard w zakresie przechowywania haseł użytkowników.
                  </li>
                  <li>Operator okresowo zmienia swoje hasła administracyjne.</li>
                  <li>W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.</li>
                  <li>
                    Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego
                    oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych
                    osobowych, co w szczególności oznacza regularne aktualizacje komponentów
                    programistycznych.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">3. Hosting</h2>
                <p className="mb-3">
                  Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: Vercel
                </p>
                <p className="mb-3">
                  Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na
                  poziomie serwera. Zapisowi mogą podlegać:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),
                  </li>
                  <li>czas nadejścia zapytania,</li>
                  <li>czas wysłania odpowiedzi,</li>
                  <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                  <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                  <li>
                    adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w
                    przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,
                  </li>
                  <li>informacje o przeglądarce użytkownika,</li>
                  <li>informacje o adresie IP,</li>
                  <li>
                    informacje diagnostyczne związane z procesem samodzielnego zamawiania usług
                    poprzez rejestratory na stronie,
                  </li>
                  <li>
                    informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz
                    wysyłanej przez Operatora.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych
                </h2>
                <p className="mb-3">
                  W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe
                  innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub
                  do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup
                  odbiorców:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li>firma hostingowa na zasadzie powierzenia</li>
                  <li>operatorzy rozwiązania typu chat online</li>
                  <li>
                    upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu
                    realizacji celu działania strony
                  </li>
                </ul>
                <p className="mb-3">
                  Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to
                  konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami
                  (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie
                  będą przetwarzane dłużej niż przez 3 lata.
                </p>
                <p className="mb-3">Przysługuje Ci prawo żądania od Administratora:</p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                  <li>ich sprostowania,</li>
                  <li>usunięcia,</li>
                  <li>ograniczenia przetwarzania,</li>
                  <li>oraz przenoszenia danych.</li>
                </ul>
                <p className="mb-3">
                  Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w
                  pkt 3.2 wobec przetwarzania danych osobowych w celu wykonania prawnie
                  uzasadnionych interesów realizowanych przez Administratora, w tym profilowania,
                  przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia
                  ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie
                  interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony
                  roszczeń.
                </p>
                <p className="mb-3">
                  Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych
                  Osobowych, ul. Stawki 2, 00-193 Warszawa.
                </p>
                <p className="mb-3">
                  Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.
                </p>
                <p className="mb-3">
                  W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym
                  podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach
                  zawartej umowy oraz w celu prowadzenia przez Administratora marketingu
                  bezpośredniego.
                </p>
                <p className="mb-3">
                  Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o
                  ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii
                  Europejskiej.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  5. Informacje w formularzach
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane
                    osobowe, o ile zostaną one podane.
                  </li>
                  <li>
                    Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres
                    IP).
                  </li>
                  <li>
                    Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie
                    danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W
                    takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony
                    zawierającej formularz.
                  </li>
                  <li>
                    Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji
                    konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia
                    serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst
                    i opis formularza w czytelny sposób informuje, do czego on służy.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">6. Logi Administratora</h2>
                <p className="mb-3">
                  Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są
                  wykorzystywane w celu administrowania serwisem.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  7. Istotne techniki marketingowe
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów
                    reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że
                    dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce
                    nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom
                    reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików
                    cookie.
                  </li>
                  <li>
                    Operator stosuje rozwiązanie badające zachowanie użytkowników poprzez tworzenie
                    map ciepła oraz nagrywanie zachowania na stronie. Te informacje są anonimizowane
                    zanim zostaną przesłane do operatora usługi tak, że nie wie on jakiej osoby
                    fizycznej one dotyczą. W szczególności nagrywaniu nie podlegają wpisywane hasła
                    oraz inne dane osobowe.
                  </li>
                  <li>
                    Operator stosuje rozwiązanie automatyzujące działanie Serwisu w odniesieniu do
                    użytkowników, np. mogące przesłać maila do użytkownika po odwiedzeniu konkretnej
                    podstrony, o ile wyraził on zgodę na otrzymywanie korespondencji handlowej od
                    Operatora.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  8. Informacja o plikach cookies
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Serwis korzysta z plików cookies.</li>
                  <li>
                    Pliki cookies (tzw. "ciasteczka") stanowią dane informatyczne, w szczególności
                    pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu
                    i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies
                    zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas
                    przechowywania ich na urządzeniu końcowym oraz unikalny numer.
                  </li>
                  <li>
                    Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki
                    cookies oraz uzyskującym do nich dostęp jest operator Serwisu.
                  </li>
                  <li>
                    Pliki cookies wykorzystywane są w następujących celach:
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                      <li>
                        utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której
                        użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i
                        hasła;
                      </li>
                      <li>
                        realizacji celów określonych powyżej w części "Istotne techniki
                        marketingowe";
                      </li>
                    </ul>
                  </li>
                  <li>
                    W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: "sesyjne"
                    (session cookies) oraz "stałe" (persistent cookies). Cookies "sesyjne" są
                    plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika
                    do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia
                    oprogramowania (przeglądarki internetowej). "Stałe" pliki cookies przechowywane
                    są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików
                    cookies lub do czasu ich usunięcia przez Użytkownika.
                  </li>
                  <li>
                    Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa)
                    zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu
                    końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym
                    zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe
                    jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten
                    temat zawiera pomoc lub dokumentacja przeglądarki internetowej.
                  </li>
                  <li>
                    Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności
                    dostępne na stronach internetowych Serwisu.
                  </li>
                  <li>
                    Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu
                    wykorzystywane mogą być również przez współpracujące z operatorem Serwisu
                    podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w
                    USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z
                    siedzibą w USA).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-js mb-4">
                  9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?
                </h2>
                <p className="mb-3">
                  Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia
                  przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla
                  procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może
                  utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www
                </p>
                <p className="mb-3">
                  W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę
                  internetową, której używasz i postępuj zgodnie z instrukcjami:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Edge
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Internet Explorer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Chrome
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Safari
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Firefox
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Opera
                    </a>
                  </li>
                </ul>
                <p className="mt-3 mb-2">Urządzenia mobilne:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Android
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Safari (iOS)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-js hover:underline">
                      Windows Phone
                    </a>
                  </li>
                </ul>
              </section>

              <div className="pt-6 border-t border-js/10 text-sm text-gray-400">
                <p>Ostatnia aktualizacja: 18.03.2025</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
