import { 
  FaUser, 
  FaBriefcase, 
  FaCode, 
  FaProjectDiagram,
  FaTrophy,
  FaPalette,
  FaFileAlt,
  FaEye,
  FaLightbulb
} from 'react-icons/fa';
import type { 
  CVTemplate, 
  CVTip, 
  CVExample, 
  CVSection,
  CVPreparationSection,
  CVStats
} from '../types/cv.types';

export const cvSections: CVSection[] = [
  {
    id: 'personal-info',
    name: 'Dane osobowe',
    description: 'Podstawowe informacje kontaktowe i linki do profili',
    isRequired: true,
    examples: ['Jan Kowalski', '+48 123 456 789', 'jan.kowalski@email.com'],
    tips: ['Używaj profesjonalnego adresu email', 'Dodaj link do GitHub i LinkedIn']
  },
  {
    id: 'summary',
    name: 'Podsumowanie',
    description: 'Krótki opis Twoich umiejętności i celów zawodowych',
    isRequired: true,
    examples: ['Frontend Developer z 3-letnim doświadczeniem w React'],
    tips: ['Maksymalnie 3-4 zdania', 'Skup się na wartości którą wnosisz']
  },
  {
    id: 'experience',
    name: 'Doświadczenie zawodowe',
    description: 'Historia Twojej pracy i osiągnięć',
    isRequired: true,
    examples: ['Frontend Developer @ TechCorp (2021-2024)'],
    tips: ['Używaj liczb i konkretnych osiągnięć', 'Zacznij od najnowszego']
  },
  {
    id: 'skills',
    name: 'Umiejętności techniczne',
    description: 'Technologie, języki programowania i narzędzia',
    isRequired: true,
    examples: ['JavaScript, React, TypeScript, Node.js'],
    tips: ['Podziel na kategorie', 'Oceń swój poziom realistycznie']
  }
];

export const cvTemplates: CVTemplate[] = [
  {
    id: 'modern-dev',
    name: 'Modern Developer',
    description: 'Nowoczesny szablon idealny dla frontend developerów',
    category: 'modern',
    difficulty: 'intermediate',
    preview: '/templates/modern-dev-preview.jpg',
    tags: ['responsive', 'clean', 'professional'],
    rating: 4.8,
    downloadCount: 1250,
    isPremium: false,
    features: ['Sekcja projektów', 'QR kod do portfolio', 'Ikony technologii']
  },
  {
    id: 'classic-tech',
    name: 'Classic Tech',
    description: 'Klasyczny layout dla profesjonalistów IT',
    category: 'classic',
    difficulty: 'beginner',
    preview: '/templates/classic-tech-preview.jpg',
    tags: ['traditional', 'corporate', 'simple'],
    rating: 4.5,
    downloadCount: 980,
    isPremium: false,
    features: ['Dwukolumnowy layout', 'Sekcja certyfikatów', 'Timeline doświadczenia']
  },
  {
    id: 'creative-ui',
    name: 'Creative UI Designer',
    description: 'Kreatywny szablon dla UI/UX designerów',
    category: 'creative',
    difficulty: 'advanced',
    preview: '/templates/creative-ui-preview.jpg',
    tags: ['colorful', 'creative', 'portfolio'],
    rating: 4.9,
    downloadCount: 750,
    isPremium: true,
    features: ['Portfolio grid', 'Custom ilustracje', 'Animowane elementy']
  }
];

export const cvTips: CVTip[] = [
  {
    id: 'tip-1',
    title: 'Opisuj projekty jak produkty',
    description: 'Każdy projekt powinien być opisany z perspektywy biznesowej',
    category: 'content',
    importance: 'high',
    icon: FaProjectDiagram,
    examples: {
      good: [
        'Zbudowałem e-commerce który zwiększył konwersję o 25%',
        'Zoptymalizowałem ładowanie strony z 3s do 800ms'
      ],
      bad: [
        'Robiłem stronę w React',
        'Używałem Redux do state management'
      ]
    }
  },
  {
    id: 'tip-2',
    title: 'Kwantyfikuj swoje osiągnięcia',
    description: 'Używaj liczb i konkretnych metryk wszędzie gdzie możesz',
    category: 'content',
    importance: 'critical',
    icon: FaTrophy,
    examples: {
      good: [
        'Zarządzałem zespołem 5 developerów',
        'Zmniejszyłem błędy w produkcji o 40%'
      ],
      bad: [
        'Pracowałem w zespole',
        'Poprawiłem jakość kodu'
      ]
    }
  },
  {
    id: 'tip-3',
    title: 'Dopasuj CV do oferty',
    description: 'Każde CV powinno być dostosowane do konkretnej pozycji',
    category: 'content',
    importance: 'high',
    icon: FaFileAlt,
    examples: {
      good: [
        'Wyróżnij technologie wymienione w ofercie',
        'Użyj słów kluczowych z ogłoszenia'
      ],
      bad: [
        'Wysyłaj to samo CV wszędzie',
        'Ignoruj wymagania w ofercie'
      ]
    }
  },
  {
    id: 'tip-4',
    title: 'Napisz summary które sprzedaje',
    description: 'Pierwsze 2-3 zdania muszą od razu pokazać Twoją wartość',
    category: 'content',
    importance: 'critical',
    icon: FaUser,
    examples: {
      good: [
        'Frontend Developer z 3-letnim doświadczeniem w React, który zbudował 8 aplikacji używanych przez 50k+ użytkowników',
        'Pasjonuję się optymalizacją performance i UX, co przełożyło się na 35% wzrost konwersji w poprzednim projekcie'
      ],
      bad: [
        'Jestem frontend developerem szukającym pracy',
        'Lubię programować i uczę się nowych technologii'
      ]
    }
  },
  {
    id: 'tip-5',
    title: 'Pokaż progresję kariery',
    description: 'Opisz jak rozwijałeś się w każdej roli i jakie wyzwania rozwiązywałeś',
    category: 'content',
    importance: 'high',
    icon: FaBriefcase,
    examples: {
      good: [
        'Awansowałem z Junior na Mid Developer w 18 miesięcy',
        'Przejąłem odpowiedzialność za mentoring 2 junior developerów'
      ],
      bad: [
        'Pracowałem jako programista przez 2 lata',
        'Wykonywałem zadania przydzielone przez team leadera'
      ]
    }
  },
  
  // Umiejętności techniczne
  {
    id: 'tip-6',
    title: 'Grupuj technologie logicznie',
    description: 'Podziel umiejętności na kategorie i oceń realistycznie swój poziom',
    category: 'skills',
    importance: 'high',
    icon: FaCode,
    examples: {
      good: [
        'Frontend: React (expert), TypeScript (advanced), CSS3 (advanced)',
        'Backend: Node.js (intermediate), MongoDB (basic)'
      ],
      bad: [
        'HTML, CSS, JavaScript, React, Angular, Vue, Node.js, PHP, Python',
        'Znam wszystkie popularne technologie'
      ]
    }
  },
  {
    id: 'tip-7',
    title: 'Dodaj kontekst do projektów',
    description: 'Każdy projekt powinien mieć opis problemu, rozwiązania i rezultatu',
    category: 'projects',
    importance: 'critical',
    icon: FaProjectDiagram,
    examples: {
      good: [
        'Problem: Wolne ładowanie dashboardu (5s+) → Rozwiązanie: Lazy loading + React.memo → Rezultat: 800ms ładowania',
        'Challenge: Brak real-time komunikacji → Solution: WebSocket + Redux → Result: 99.9% uptime'
      ],
      bad: [
        'Aplikacja do zarządzania zadaniami w React',
        'Strona internetowa z responsive design'
      ]
    }
  },
  {
    id: 'tip-8',
    title: 'Pokaż impact na biznes',
    description: 'Połącz swoje działania techniczne z rezultatami biznesowymi',
    category: 'projects',
    importance: 'high',
    icon: FaTrophy,
    examples: {
      good: [
        'Optymalizacja SEO zwiększyła ruch organiczny o 150%',
        'Przepisanie na TypeScript zmniejszyło bugi o 60%'
      ],
      bad: [
        'Używałem najlepszych praktyk programowania',
        'Kod był bardzo czysty i dobrze zorganizowany'
      ]
    }
  },
  {
    id: 'tip-13',
    title: 'Highlight kluczowych słów',
    description: 'Używaj bold i formatowania do wyróżnienia najważniejszych informacji',
    category: 'content',
    importance: 'medium',
    icon: FaLightbulb,
    examples: {
      good: [
        '**Senior Frontend Developer** z doświadczeniem w **React** i **TypeScript**',
        'Zwiększyłem **performance o 60%** i zmniejszyłem **bundle size o 40%**'
      ],
      bad: [
        'Senior Frontend Developer z doświadczeniem w React i TypeScript',
        'Poprawiłem wydajność aplikacji i zoptymalizowałem kod'
      ]
    }
  },
  {
    id: 'tip-14',
    title: 'Dodaj soft skills z kontekstem',
    description: 'Nie wymieniaj soft skills w liście - pokaż je przez konkretne sytuacje',
    category: 'content',
    importance: 'high',
    icon: FaUser,
    examples: {
      good: [
        'Przeprowadziłem 15+ code review, mentorując 3 junior developerów',
        'Zorganizowałem warsztat Git dla zespołu 12 osób'
      ],
      bad: [
        'Komunikatywny, lider zespołu, kreatywny',
        'Umiejętności interpersonalne, praca w zespole'
      ]
    }
  },
  {
    id: 'tip-15',
    title: 'Opisuj responsibility + impact',
    description: 'Każda odpowiedzialność powinna mieć mierzalny rezultat',
    category: 'content',
    importance: 'critical',
    icon: FaTrophy,
    examples: {
      good: [
        'Odpowiadałem za frontend dashboard → rezultat: 25% wzrost user engagement',
        'Prowadziłem daily standups → rezultat: 30% szybsze delivery'
      ],
      bad: [
        'Odpowiadałem za frontend aplikacji',
        'Uczestniczyłem w daily standups'
      ]
    }
  },
  {
    id: 'tip-16',
    title: 'Pokarz development path',
    description: 'Opisz jak rozwijałeś się w firmie i jakie nowe technologie opanowałeś',
    category: 'content',
    importance: 'high',
    icon: FaBriefcase,
    examples: {
      good: [
        'Zacząłem jako Junior, po roku awansowałem na Regular, obecnie prowadzę zespół 4 osób',
        'W ciągu 2 lat opanowałem: React → Next.js → TypeScript → Mikrofrontendy'
      ],
      bad: [
        'Pracowałem jako Developer przez 3 lata',
        'Rozwijałem swoje umiejętności programistyczne'
      ]
    }
  },
  
  // Umiejętności techniczne
  {
    id: 'tip-17',
    title: 'Linki do GitHub i live demo',
    description: 'Każdy projekt powinien mieć link do kodu i działającej wersji',
    category: 'projects',
    importance: 'critical',
    icon: FaCode,
    examples: {
      good: [
        'GitHub: github.com/twojnick/projekt | Live: projekt.vercel.app',
        'Code: bit.ly/projekt-repo | Demo: projekt-demo.netlify.app'
      ],
      bad: [
        'Kod dostępny na życzenie',
        'Projekt można zobaczyć podczas rozmowy'
      ]
    }
  },
  {
    id: 'tip-18',
    title: 'Tech stack + dlaczego',
    description: 'Nie tylko co użyłeś, ale dlaczego to wybrałeś',
    category: 'projects',
    importance: 'high',
    icon: FaProjectDiagram,
    examples: {
      good: [
        'Next.js (SSR dla SEO), TypeScript (safety), Prisma (type-safe DB)',
        'React Query (caching), Zustand (lightweight state), Tailwind (rapid styling)'
      ],
      bad: [
        'React, Node.js, MongoDB, Express',
        'Nowoczesny stack technologiczny'
      ]
    }
  },
  {
    id: 'tip-19',
    title: 'Podziel skills na poziomy',
    description: 'Bądź szczery co do swojego poziomu - rekruterzy to sprawdzą',
    category: 'skills',
    importance: 'high',
    icon: FaCode,
    examples: {
      good: [
        'Expert: JavaScript, React, CSS3 | Advanced: TypeScript, Node.js | Learning: Go, Rust',
        '4+ years: React, 2 years: TypeScript, 6 months: Next.js'
      ],
      bad: [
        'JavaScript, React, TypeScript, Node.js, Python, Go, Rust',
        'Zaawansowane umiejętności we wszystkich popularnych technologiach'
      ]
    }
  },
  {
    id: 'tip-20',
    title: 'Pokarz continuous learning',
    description: 'Rekruterzy w IT cenią people którzy się rozwijają',
    category: 'skills',
    importance: 'medium',
    icon: FaLightbulb,
    examples: {
      good: [
        'Obecnie uczę się: Next.js 14, Server Components | Certyfikat AWS w trakcie',
        'Last 6 months: opanowałem TypeScript, Redux Toolkit, React Query'
      ],
      bad: [
        'Interesuję się nowymi technologiami',
        'Ciągle się uczę i rozwijam'
      ]
    }
  },
  {
    id: 'tip-21',
    title: 'Testing i quality practices',
    description: 'Pokaż że dbasz o jakość kodu - to wyróżnia seniora',
    category: 'skills',
    importance: 'high',
    icon: FaTrophy,
    examples: {
      good: [
        'Testing: Jest, React Testing Library, Cypress E2E | Coverage >90%',
        'Code quality: ESLint, Prettier, Husky pre-commits, SonarQube'
      ],
      bad: [
        'Znam testowanie aplikacji',
        'Dbam o jakość kodu'
      ]
    }
  },
  
  // Design i formatowanie
  {
    id: 'tip-9',
    title: 'Maksymalnie 2 strony',
    description: 'Rekruterzy nie mają czasu na długie CV. Skondensuj najważniejsze informacje',
    category: 'design',
    importance: 'high',
    icon: FaPalette,
    examples: {
      good: [
        'Najważniejsze projekty na pierwszej stronie',
        'Edukacja i certyfikaty na końcu'
      ],
      bad: [
        'Szczegółowy opis każdego projektu z uczelni',
        'Lista wszystkich kursów online'
      ]
    }
  },
  {
    id: 'tip-10',
    title: 'Czytelna typografia',
    description: 'Użyj profesjonalnych fontów i zachowaj konsystentną hierarchię',
    category: 'design',
    importance: 'medium',
    icon: FaFileAlt,
    examples: {
      good: [
        'Arial, Helvetica, Calibri - max 2 fonty',
        'Nagłówki 14-16pt, tekst 11-12pt'
      ],
      bad: [
        'Comic Sans, fancy decorative fonts',
        'Mix 5 różnych fontów w jednym CV'
      ]
    }
  },
  {
    id: 'tip-11',
    title: 'Wykorzystaj białą przestrzeń',
    description: 'Nie wypełniaj każdego piksela. Białe miejsca poprawiają czytelność',
    category: 'design',
    importance: 'medium',
    icon: FaPalette,
    examples: {
      good: [
        'Marginesy min 2cm, odstępy między sekcjami',
        'Bullet points z odpowiednimi odstępami'
      ],
      bad: [
        'Tekst od brzegu do brzegu',
        'Brak odstępów między sekcjami'
      ]
    }
  },
  {
    id: 'tip-12',
    title: 'Proste kolory',
    description: 'Użyj maksymalnie 2-3 kolorów. Niech tekst będzie łatwy do czytania',
    category: 'design',
    importance: 'medium',
    icon: FaPalette,
    examples: {
      good: [
        'Czarny tekst, niebieski accent, szary podtekst',
        'Wysoki kontrast, łatwe czytanie'
      ],
      bad: [
        'Żółty tekst na białym tle',
        'Tęczowe nagłówki, różowe tło'
      ]
    }
  },
  {
    id: 'tip-22',
    title: 'ATS-friendly format',
    description: 'CV musi przejść przez systemy automatycznego skanowania',
    category: 'design',
    importance: 'critical',
    icon: FaFileAlt,
    examples: {
      good: [
        'Standardowe nagłówki: Experience, Skills, Education',
        'Plain text format, standardowe fonty, brak tabeli'
      ],
      bad: [
        'Kreatywne nazwy sekcji: "Moja podróż", "Superpowers"',
        'CV w postaci infografiki, tekst w obrazkach'
      ]
    }
  },
  {
    id: 'tip-23',
    title: 'Consistent formatting',
    description: 'Używaj tych samych formatów dat, nazw, i odstępów przez całe CV',
    category: 'design',
    importance: 'medium',
    icon: FaPalette,
    examples: {
      good: [
        'Mar 2021 - Present, Jan 2020 - Feb 2021',
        'React.js, Node.js, MongoDB (zawsze z .js)'
      ],
      bad: [
        'March 2021 - obecnie, 01/2020 - 02/21',
        'React, Node.js, MongoDB, Vue.JS'
      ]
    }
  },
  {
    id: 'tip-24',
    title: 'PDF export quality',
    description: 'Zawsze wysyłaj CV jako PDF, sprawdź jak wygląda po eksporcie',
    category: 'design',
    importance: 'high',
    icon: FaFileAlt,
    examples: {
      good: [
        'Nazwa pliku: Jan_Kowalski_Frontend_Developer.pdf',
        'Sprawdź czy tekst da się zaznaczyć i skopiować'
      ],
      bad: [
        'CV.pdf, dokument1.pdf, untitled.pdf',
        'PDF ze skanowanego dokumentu (obrazek)'
      ]
    }
  },
  {
    id: 'tip-25',
    title: 'Email i contact info',
    description: 'Kontakt powinien być na górze i łatwy do znalezienia',
    category: 'design',
    importance: 'high',
    icon: FaUser,
    examples: {
      good: [
        'jan.kowalski@gmail.com | +48 123 456 789',
        'github.com/jkowalski | linkedin.com/in/jankowalski'
      ],
      bad: [
        'Email i telefon na dole CV',
        'Brak linków do GitHub/LinkedIn'
      ]
    }
  },
  {
    id: 'tip-26',
    title: 'Bullets vs paragraphs',
    description: 'Używaj bullet points zamiast długich akapitów - łatwiej skanować',
    category: 'design',
    importance: 'medium',
    icon: FaPalette,
    examples: {
      good: [
        '• Zbudowałem 5 aplikacji React\\n• Zmniejszyłem czas ładowania o 60%\\n• Mentorowane 3 junior devs',
        'Krótkie, konkretne punkty z mierzalnymi rezultatami'
      ],
      bad: [
        'W tej roli odpowiadałem za budowę aplikacji frontendowych w React. Pracowałem nad optymalizacją...',
        'Długie akapity tekstu trudne do przeczytania'
      ]
    }
  },
  {
    id: 'tip-27',
    title: 'Reverse chronological order',
    description: 'Najnowsze doświadczenie zawsze na górze - rekruterzy to sprawdzają pierwsze',
    category: 'design',
    importance: 'high',
    icon: FaBriefcase,
    examples: {
      good: [
        'Senior Developer (2023-Present)\\nMid Developer (2021-2023)\\nJunior (2020-2021)',
        'Najnowsze projekty i technologie jako pierwsze'
      ],
      bad: [
        'Chronologicznie od początku kariery',
        'Mieszanie dat bez logicznego porządku'
      ]
    }
  }
];

export const cvExamples: CVExample[] = [
  {
    id: 'project-description-ecommerce',
    title: 'Opis projektu e-commerce',
    description: 'Profesjonalny opis projektu sklepu internetowego',
    type: 'project-description',
    level: 'mid',
    field: 'frontend',
    content: `**ShopMax - Platforma e-commerce B2C**

*Frontend Developer | React, TypeScript, Next.js | Marzec 2023 - Listopad 2023*

Zbudowałem kompletną platformę e-commerce obsługującą 10,000+ produktów z zaawansowanym systemem filtrowania i wyszukiwania.

**Główne osiągnięcia:**
• Zwiększyłem konwersję o 25% dzięki optymalizacji UX checkout flow
• Zmniejszyłem czas ładowania strony z 3.2s do 800ms przez lazy loading i code splitting
• Zaimplementowałem PWA funkcjonalności zwiększające retention o 15%

**Technologie:** React 18, TypeScript, Next.js 13, Redux Toolkit, Stripe API, Algolia Search`,
    highlightPoints: [
      'Konkretne liczby i metryki',
      'Biznesowy wpływ (konwersja, retention)',
      'Nowoczesny stack technologiczny',
      'Rozwiązywanie problemów performance'
    ]
  },
  {
    id: 'skill-description-react',
    title: 'Opis umiejętności React',
    description: 'Jak profesjonalnie opisać znajomość React',
    type: 'skill-description',
    level: 'senior',
    field: 'frontend',
    content: `**React.js - Expert (4 lata doświadczenia)**

• Zaawansowana znajomość Hooks API, Context API, i wzorców kompozycji
• Optymalizacja performance (React.memo, useMemo, lazy loading)
• Budowa własnych custom hooks i komponentów wielokrotnego użytku
• Praca z ekosystemem: Redux, React Router, React Query, Framer Motion
• Doświadczenie w SSR/SSG z Next.js i Gatsby
• Code splitting, lazy loading, bundle optimization
• Testing z Jest, React Testing Library, Storybook

**Projekty:** 12+ aplikacji produkcyjnych, w tym platformy e-commerce, dashboardy analityczne, systemy CRM`,
    highlightPoints: [
      'Konkretny poziom i lata doświadczenia',
      'Zaawansowane techniki i optymalizacje',
      'Szeroki ekosystem narzędzi',
      'Liczba projektów i ich rodzaje'
    ]
  },
  {
    id: 'summary-frontend-senior',
    title: 'Summary dla Senior Frontend Developer',
    description: 'Profesjonalne podsumowanie dla doświadczonego frontend developera',
    type: 'section',
    level: 'senior',
    field: 'frontend',
    content: `**Senior Frontend Developer | 5+ lat doświadczenia | React Specialist**

Doświadczony frontend developer z pasją do budowy skalowalnych aplikacji web. Przez ostatnie 5 lat zbudowałem 12+ aplikacji używanych przez 100k+ użytkowników. Specjalizuję się w React, TypeScript i performance optimization.

**Główne osiągnięcia:**
• 40% wzrost conversion rate dzięki A/B testing i UX improvements
• Przepisanie legacy codebase na TypeScript - 60% mniej bugów w production  
• Mentoring 8 junior developerów, z których 6 awansowało na mid level

**Obecnie szukam:** Senior/Lead Frontend roli w fintech/SaaS gdzie mogę łączyć technical expertise z team leadership.`,
    highlightPoints: [
      'Konkretne lata doświadczenia i specjalizacja',
      'Kwantyfikowalne osiągnięcia z business impact',
      'Pokazuje leadership skills poprzez mentoring',
      'Jasno określa czego szuka w nowej roli'
    ]
  },
  {
    id: 'project-saas-dashboard',
    title: 'Opis projektu SaaS Dashboard',
    description: 'Kompleksowy opis projektu business dashboard z mikrofrontendami',
    type: 'project-description',
    level: 'senior',
    field: 'fullstack',
    content: `**AnalyticsPro - SaaS Analytics Dashboard**

*Lead Frontend Developer | React, TypeScript, Mikrofrontendy | Jan 2023 - Present*

Enterprise-grade analytics platform obsługujący 50k+ użytkowników biznesowych z real-time data visualization i custom reports.

**Technical challenges solved:**
• **Performance**: Zoptymalizowałem rendering 10k+ data points przez virtualization - czas ładowania z 8s → 1.2s
• **Scalability**: Przeprojektowałem architekturę na mikrofrontendy (Module Federation) - 5 zespołów może deployować niezależnie  
• **UX**: Zaimplementowałem smart caching i progressive loading - 90% zapytań ładuje się <500ms

**Technical Stack:**
Frontend: React 18, TypeScript, Zustand, React Query, D3.js, Module Federation
Backend: Node.js, PostgreSQL, Redis, Kafka (real-time events)
Infrastructure: AWS (ECS, CloudFront), Docker, GitHub Actions CI/CD

**Business Impact:** 35% wzrost user retention, 60% mniej support ticketów dzięki lepszemu UX

**Links:** [Live Demo](demo.analyticspro.com) | [Architecture Blog Post](blog.com/mikrofrontendy)`,
    highlightPoints: [
      'Konkretny scope i scale projektu (50k+ users)',
      'Technical challenges z before/after metryki',
      'Nowoczesny stack z uzasadnieniem wyboru',
      'Business impact quantified',
      'Linki do demo i dokumentacji'
    ]
  },
  {
    id: 'skill-react-expert',
    title: 'Opis expertisy w React',
    description: 'Jak opisać zaawansowaną znajomość React z konkretami',
    type: 'skill-description',
    level: 'senior',
    field: 'frontend',
    content: `**React.js - Expert Level (5+ lat komercyjnego doświadczenia)**

**Core expertise:**
• Advanced Hooks patterns: custom hooks, useReducer z complex state, useCallback optimization
• Performance optimization: React.memo, useMemo, lazy loading, code splitting (5-10x faster apps)
• Modern patterns: Compound Components, Render Props, Higher-Order Components
• State management: Redux Toolkit, Zustand, Context API + useReducer dla complex flows

**Architecture & Scaling:**
• Mikrofrontendy z Module Federation - 3 produkty w jednym dashboardzie
• Design Systems: budowa reusable component library używanej przez 4 zespoły
• Server Components (Next.js 13+) dla optimal loading i SEO

**Testing & Quality:**
• 90%+ test coverage: Jest, React Testing Library, MSW dla API mocking
• Storybook dla component documentation - 50+ stories
• TypeScript integration dla type-safe development

**Projects delivered:** 
12+ production apps including e-commerce (50k users), fintech dashboard (enterprise), real-time chat (WebSocket)

**Mentoring:** Przeprowadziłem 20+ code reviews, wyszkolił 6 junior devs w React best practices`,
    highlightPoints: [
      'Konkretny poziom i lata doświadczenia',
      'Zaawansowane techniki z rezultatami',
      'Architekturalne doświadczenie (mikrofrontendy)',
      'Praktyki quality i testing',
      'Leadership przez mentoring'
    ]
  },
  {
    id: 'experience-midlevel',
    title: 'Opis doświadczenia Mid-Level Developer',
    description: 'Jak opisać 2-3 lata doświadczenia bez przesady',
    type: 'section',
    level: 'mid',
    field: 'frontend',
    content: `**Frontend Developer @ TechCorp | Mar 2022 - Present**
*React, TypeScript, Node.js | Remote | Zespół 8 osób*

Rozwijam i utrzymuję 3 aplikacje React dla 15k+ aktywnych użytkowników. Odpowiedzialny za frontend features od design do production deployment.

**Key achievements:**
• **Feature development**: Dostarczyłem 25+ user stories, średnio 2 tygodnie cycle time
• **Performance**: Zoptymalizowałem main bundle - czas ładowania z 4.2s → 1.8s (lazy loading + tree shaking)
• **Code quality**: Wprowadziliśmy TypeScript migration - 45% mniej runtime errors
• **Team collaboration**: Aktywnie uczestniczę w code reviews (50+ w ostatnim kwartale)

**Technical growth:**
Zacząłem z podstawowym React/JS, obecnie swobodnie pracuję z TypeScript, state management (Redux Toolkit), i testing (Jest, RTL). W ostatnim roku dołączyły: Next.js, GraphQL, Docker basics.

**Challenges solved:**
• Przepisanie legacy jQuery modal system na React portals
• Integracja 3rd party payment API z error handling i retry logic  
• Setup automated testing pipeline - coverage z 20% → 75%

**Next steps:** Chcę rozwijać się w kierunku senior frontend role z większą odpowiedzialnością za architecture decisions.`,
    highlightPoints: [
      'Realistic scope dla mid-level (3 apps, 15k users)',
      'Pokazuje growth trajectory i learning',
      'Konkretne achievements z metrykami',
      'Honest o tym czego się nauczył',
      'Clear next steps w karierze'
    ]
  },
  {
    id: 'junior-first-job',
    title: 'Opis pierwszej pracy Junior Developer',
    description: 'Jak opisać początek kariery bez doświadczenia komercyjnego',
    type: 'section',
    level: 'junior',
    field: 'frontend',
    content: `**Junior Frontend Developer @ StartupXYZ | Sep 2023 - Present**
*React, JavaScript, CSS3 | Hybrydowo | Zespół 5 osób*

Moja pierwsza komercyjna rola jako frontend developer. Pracuję nad company website i customer portal używanych przez 2k+ użytkowników miesięcznie.

**Responsibilities & Learning:**
• **Bug fixing**: Rozwiązałem 40+ issues, głównie UI/responsiveness problems
• **Feature implementation**: Zbudowałem 8 smaller features (contact forms, filters, modals)
• **Code reviews**: Uczestniczę w weekly code reviews, implementuję feedback od senior devs
• **Testing**: Wprowadzenie do writing unit tests - już 15 testów napisanych samodzielnie

**Technical progress w 6 miesięcy:**
✅ JavaScript ES6+ → React fundamentals → hooks i state management
✅ CSS3 → Sass → CSS-in-JS (styled-components)  
✅ Git basics → branching strategies → pull request workflow
✅ Responsive design → mobile-first approach → cross-browser testing

**Projects contributed to:**
• Company landing page redesign - lepszy mobile experience
• Customer login portal - dodanie "remember me" i password reset
• Internal admin panel - filters i search functionality

**Feedback od team:** "Szybko się uczy, zadaje dobre pytania, code quality poprawia się każdy sprint"

**Goals:** W następnym roku chcę opanować TypeScript i zacząć pracę z backend APIs.`,
    highlightPoints: [
      'Honest że to pierwsza komercyjna rola',
      'Pokazuje concrete progress i learning',
      'Realistic scope dla juniora',
      'Feedback od zespołu dodaje credibility',
      'Clear learning goals na przyszłość'
    ]
  }
];

export const cvPreparationSections: CVPreparationSection[] = [
  {
    id: 'content-tips',
    title: 'Treść i zawartość',
    description: 'Jak napisać CV które sprzeda Twoje umiejętności',
    icon: FaLightbulb,
    stats: { items: 8, completed: 0 },
    isAvailable: true
  },
  {
    id: 'technical-tips',
    title: 'Umiejętności techniczne',
    description: 'Jak prezentować projekty i technologie',
    icon: FaCode,
    stats: { items: 9, completed: 0 },
    isAvailable: true
  },
  {
    id: 'design-tips',
    title: 'Formatowanie i design',
    description: 'Jak sprawić żeby CV wyglądało profesjonalnie',
    icon: FaPalette,
    stats: { items: 10, completed: 0 },
    isAvailable: true
  },
  {
    id: 'examples',
    title: 'Przykłady opisów',
    description: 'Gotowe opisy projektów i doświadczenia',
    icon: FaEye,
    stats: { items: 7, completed: 0 },
    isAvailable: true
  }
];

export const cvStats: CVStats = {
  totalTemplates: 0,
  totalTips: 27,
  totalExamples: 7,
  userProgress: {
    sectionsCompleted: 0,
    totalSections: 4,
    lastUpdated: new Date().toISOString()
  }
}; 