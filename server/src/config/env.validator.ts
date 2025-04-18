type EnvVar = {
  value: string | undefined;
  required: boolean;
  default?: string;
  validator?: (value: string) => boolean;
};


const envSchema: Record<string, EnvVar> = {
  NODE_ENV: {
    value: process.env.NODE_ENV,
    required: false,
    default: 'development',
    validator: (value) => ['development', 'production', 'test'].includes(value),
  },
  PORT: {
    value: process.env.PORT,
    required: false,
    default: '5001',
    validator: (value) => !isNaN(Number(value)),
  },
  MONGODB_URI: {
    value: process.env.MONGODB_URI,
    required: true,
    validator: (value) => value.startsWith('mongodb://') || value.startsWith('mongodb+srv://'),
  },
  JWT_SECRET: {
    value: process.env.JWT_SECRET,
    required: true,
    validator: (value) => value.length >= 32,
  },
  JWT_EXPIRES_IN: {
    value: process.env.JWT_EXPIRES_IN,
    required: false,
    default: '24h',
  },
  JWT_COOKIE_EXPIRES_IN: {
    value: process.env.JWT_COOKIE_EXPIRES_IN,
    required: false,
    default: '86400000',
    validator: (value) => !isNaN(Number(value)),
  },
  FRONTEND_URL: {
    value: process.env.FRONTEND_URL,
    required: false,
    default: 'http://localhost:3000',
    validator: (value) => value.startsWith('http://') || value.startsWith('https://'),
  },
  RATE_LIMIT_WINDOW_MS: {
    value: process.env.RATE_LIMIT_WINDOW_MS,
    required: false,
    default: '900000',
    validator: (value) => !isNaN(Number(value)),
  },
  RATE_LIMIT_MAX: {
    value: process.env.RATE_LIMIT_MAX,
    required: false,
    default: '100',
    validator: (value) => !isNaN(Number(value)),
  },
  EMAIL_HOST: {
    value: process.env.EMAIL_HOST,
    required: false,
  },
  EMAIL_PORT: {
    value: process.env.EMAIL_PORT,
    required: false,
    validator: (value) => !isNaN(Number(value)),
  },
  EMAIL_USER: {
    value: process.env.EMAIL_USER,
    required: false,
  },
  EMAIL_PASSWORD: {
    value: process.env.EMAIL_PASSWORD,
    required: false,
  },
  EMAIL_FROM: {
    value: process.env.EMAIL_FROM,
    required: false,
    default: 'kontakt@codelinesjs.pl',
    validator: (value) => value.includes('@'),
  },
  SENDGRID_API_KEY: {
    value: process.env.SENDGRID_API_KEY,
    required: false,
  },
};

export const validateEnv = () => {
  const errors: string[] = [];
  const validEnv: Record<string, string> = {};

  for (const [key, config] of Object.entries(envSchema)) {
    let value = config.value;

    if (!value && config.default !== undefined) {
      value = config.default;
    }

    if (config.required && !value) {
      errors.push(`Brak wymaganej zmiennej środowiskowej: ${key}`);
      continue;
    }

    if (value && config.validator && !config.validator(value)) {
      errors.push(`Nieprawidłowa wartość zmiennej środowiskowej ${key}: ${value}`);
      continue;
    }

    validEnv[key] = value || '';
  }

  if (errors.length > 0) {
    console.error('Błędy konfiguracji zmiennych środowiskowych:');
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
  }

  return validEnv;
};

export const env = validateEnv(); 