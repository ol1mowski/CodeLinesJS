# CodeLinesJS - Interactive JavaScript Learning Platform

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
- React Query for data fetching

### Backend & Authentication
- Express.js
- JWT Authentication
- Google Authentication
- Password reset functionality

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

# Install dependencies for both client and server
cd CodeLinesJS
npm install

# Setup environment variables
# Create .env files for both client and server directories
```

### Environment Variables

#### Server (.env)
Create a `.env` file in the server directory with the following variables:

```
PORT=5001                      # Server port
MONGODB_URI=<your-mongodb-uri> # MongoDB connection string
FRONTEND_URL=<frontend-url>    # URL of the frontend application

NODE_ENV=development           # Environment (development/production)

# JWT Configuration
JWT_EXPIRES_IN=24h             # JWT token expiration time
JWT_COOKIE_EXPIRES_IN=86400000 # JWT cookie expiration time in ms
JWT_SECRET=<your-jwt-secret>   # Secret key for JWT

# Email Configuration
EMAIL_HOST=<your-email-host>   # SMTP host
EMAIL_PORT=465                 # SMTP port
EMAIL_USER=<your-email>        # Email username
EMAIL_PASSWORD=<your-password> # Email password
EMAIL_FROM=<your-email>        # Sender email address

# Rate Limiting
RATE_LIMIT_MAX=1000            # Maximum number of requests
RATE_LIMIT_WINDOW_MS=900000    # Time window for rate limiting in ms

# AI Services
GEMINI_API_KEY=<your-api-key>  # Gemini AI API key
HUGGING_FACE_API_KEY=<your-api-key> # Hugging Face API key

# OAuth
VITE_GOOGLE_CLIENT_ID=<your-client-id> # Google OAuth client ID

# Email Service
SENDGRID_API_KEY=<your-api-key> # SendGrid API key
```

#### Client (.env)
Create a `.env` file in the client directory with the following variables:

```
VITE_GOOGLE_CLIENT_ID=<your-client-id> # Google OAuth client ID
VITE_API_URL=<backend-api-url>         # Backend API URL
```

### Running the Application

```bash
# Run both server and client in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 🐳 Docker

CodeLinesJS is fully containerized, allowing easy deployment across different environments.

### Running with Docker Compose

```bash
# Run the entire application
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Available Docker Images

- `codelinesjs-client` - React Frontend
- `codelinesjs-server` - Express Backend API
- `mongo` - MongoDB Database

### Building Custom Images

```bash
# Build client image
docker build -t codelinesjs-client -f Dockerfile.client .

# Build server image
docker build -t codelinesjs-server -f Dockerfile.server .

# Build monolithic image (containing both client and server)
docker build -t codelinesjs .
```

## ☸️ Kubernetes

The project includes full Kubernetes configuration, enabling deployment in a cluster environment.

### Configuration Structure

```
kubernetes/
├── base/                     # Base manifests
│   ├── namespace.yaml        # Application namespace
│   ├── mongodb.yaml          # MongoDB database
│   ├── server.yaml           # Backend API
│   ├── client.yaml           # React Frontend
│   ├── ingress.yaml          # Ingress for external access
│   └── cert-manager.yaml     # SSL certificate configuration
│
└── overlays/                 # Overlays for different environments
    ├── dev/                  # Development environment
    └── prod/                 # Production environment
```

### Deploying to Kubernetes

```bash
# Deploy to development environment
cd kubernetes && ./deploy.sh dev

# Deploy to production environment
cd kubernetes && ./deploy.sh prod
```

### Requirements

- Kubernetes cluster (e.g., minikube, EKS, GKE, AKS)
- kubectl and kustomize
- Ingress-nginx and cert-manager (for HTTPS)

More information in the documentation in the `kubernetes/` directory.

## 📁 Project Structure

```
CodeLinesJS/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Dashboard/     # Dashboard components
│   │   │   ├── Game/          # Game-related components
│   │   │   └── UI/            # Shared UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── context/           # Context API state management
│   │   ├── services/          # External services integration
│   │   ├── utils/             # Utility functions
│   │   ├── api/               # API client and service functions
│   │   ├── types/             # TypeScript type definitions
│   │   └── assets/            # Static assets and images
│   ├── public/                # Public assets
│   └── tests/                 # Frontend tests
│
├── server/                    # Backend application
│   ├── src/
│   │   ├── api/               # API endpoints
│   │   │   └── controllers/   # Route controllers
│   │   ├── models/            # Database models
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript type definitions
│   ├── docs/                  # API documentation
│   └── tests/                 # Backend tests
│
├── kubernetes/                # Kubernetes configuration
├── .github/                   # GitHub Actions CI/CD pipeline
└── docker-compose.yml         # Docker Compose configuration
```

## 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run unit tests
npm run test:unit

# Run specific test suite
npm run test -- -t "auth tests"
```

## 📚 API Documentation

The API documentation is available at `/api/docs` when running the server. It includes details about all endpoints, request/response formats, and authentication requirements.

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation and sanitization
- Secure HTTP headers

## 📝 License

CodeLinesJS is licensed under the MIT License. See the LICENSE file for details.

## 📫 Contact

- **Email**: [oliwier.markiewicz.dev@gmail.com](mailto:oliwier.markiewicz.dev@gmail.com)
- **LinkedIn**: [Oliwier Markiewicz](https://www.linkedin.com/in/oliwier-markiewicz-47857228a/)
- **GitHub**: [@ol1mowski](https://github.com/ol1mowski)


🚧 *The project is actively being developed. Documentation will be updated regularly.*

