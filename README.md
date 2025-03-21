# CodeLinesJS - Interaktywna Platforma do Nauki JavaScript

## Landing page

![{F953484C-28A7-4177-84FA-8380813F80B4}](https://github.com/user-attachments/assets/969a5ba6-0bc2-48e4-be1d-42e4b1bd7b00)

## Auth page
![obraz](https://github.com/user-attachments/assets/e65383c2-600a-4ebf-bb23-dcc1b5ef8926)

## Dashboard
<img width="1440" alt="Screenshot 2025-02-21 at 18 00 56" src="https://github.com/user-attachments/assets/1aeae37b-cdd9-4ff4-9e70-4eed53e8ec66" />


# 🚀 CodeLinesJS

CodeLinesJS is an innovative educational platform that transforms learning JavaScript into an engaging and interactive experience. By combining gamification elements with hands-on programming challenges, we create a unique learning environment tailored for beginners and intermediate developers.

## 👨‍💻 Author
**Oliwier Markiewicz**

## ✨ Key Features

### 🎮 Interactive Learning
- Gamified learning system that keeps users engaged
- Hands-on coding challenges with real-world applications
- Instant feedback to enhance the learning process

### 🏆 Achievements & Leaderboards
- Earn points for completing challenges
- Compete on community leaderboards
- Unlock special badges for outstanding achievements

### 👥 Community & Collaboration
- Built-in forums and discussion groups
- Real-time chat with other developers
- Follow other users and track their progress
- Notification system to stay updated on activities

### 🤖 AI-Powered Learning (Coming Soon!)
- AI mentor providing real-time hints and code suggestions
- Personalized learning recommendations based on progress
- AI-powered debugging assistance

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js (for 3D visualizations)

### State Management & Routing
- React Context API
- React Router 6

### Backend & Authentication
- Express.js
- Google Authentication

### Database
- MongoDB

### Real-Time Features
- WebSockets for real-time messaging
- Notification system

### Testing
- Vitest
- Playwright

### Deployment & Infrastructure
- Docker
- Kubernetes
- GitHub Actions (CI/CD)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ol1mowski/CodeLinesJS.git

# Install dependencies
cd CodeLinesJS
npm install

# Setup environment variables
cp .env.example .env
# Fill in the required values in the .env file

# Run in development mode
npm run dev

# Build for production
npm run build
```

## 🐳 Docker

CodeLinesJS jest w pełni skonteneryzowany, co umożliwia łatwe uruchomienie aplikacji w różnych środowiskach.

### Uruchamianie za pomocą Docker Compose

```bash
# Uruchomienie całej aplikacji
docker-compose up -d

# Sprawdzenie logów
docker-compose logs -f

# Zatrzymanie usług
docker-compose down
```

### Dostępne obrazy Docker

- `codelinesjs-client` - Frontend React
- `codelinesjs-server` - Backend API
- `mongo` - Baza danych MongoDB

### Budowanie własnych obrazów

```bash
# Budowanie obrazu klienta
docker build -t codelinesjs-client -f Dockerfile.client .

# Budowanie obrazu serwera
docker build -t codelinesjs-server -f Dockerfile.server .

# Budowanie monolitycznego obrazu (zawierającego klienta i serwer)
docker build -t codelinesjs .
```

## ☸️ Kubernetes

Projekt zawiera pełną konfigurację Kubernetes, umożliwiającą wdrożenie w środowisku klastrowym.

### Struktura konfiguracji

```
kubernetes/
├── base/                     # Podstawowe manifesty
│   ├── namespace.yaml        # Namespace dla aplikacji
│   ├── mongodb.yaml          # Baza danych MongoDB
│   ├── server.yaml           # Backend API
│   ├── client.yaml           # Frontend React
│   ├── ingress.yaml          # Ingress dla dostępu zewnętrznego
│   └── cert-manager.yaml     # Konfiguracja certyfikatów SSL
│
└── overlays/                 # Nakładki dla różnych środowisk
    ├── dev/                  # Środowisko deweloperskie
    └── prod/                 # Środowisko produkcyjne
```

### Wdrażanie na Kubernetes

```bash
# Wdrażanie w środowisku deweloperskim
cd kubernetes && ./deploy.sh dev

# Wdrażanie w środowisku produkcyjnym
cd kubernetes && ./deploy.sh prod
```

### Wymagania

- Klaster Kubernetes (np. minikube, EKS, GKE, AKS)
- kubectl i kustomize
- Ingress-nginx i cert-manager (dla HTTPS)

Więcej informacji w dokumentacji w katalogu `kubernetes/`.

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Auth/          # Authentication components
│   ├── Dashboard/     # Dashboard and related components
│   ├── Game/          # Game-related components
│   └── UI/            # Shared UI components
├── hooks/             # Custom hooks
├── context/           # Context API state management
├── services/          # External services (API, Firebase, etc.)
└── utils/             # Utility functions
```

## 🧪 Running Tests

```bash
# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run unit tests only
npm run test:unit
```

## 📝 License

CodeLinesJS is licensed under the MIT License. See the LICENSE file for details.

## 📫 Contact

- **Email**: [oliwier.markiewicz.dev@gmail.com](mailto:oliwier.markiewicz.dev@gmail.com)
- **LinkedIn**: [Oliwier Markiewicz](https://www.linkedin.com/in/oliwier-markiewicz-47857228a/)
- **GitHub**: [@ol1mowski](https://github.com/ol1mowski)

---

🚧 *The project is actively being developed. Documentation will be updated regularly.*


