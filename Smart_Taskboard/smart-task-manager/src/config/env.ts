import 'dotenv/config';

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

interface EnvConfig {
  nodeEnv: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpirationMs: number;
  invitationExpiryDays: number;
  smtp: SmtpConfig;
  frontendUrl: string;
  corsOrigin: string;
}

function validateEnv(): EnvConfig {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'JWT_EXPIRATION_MS'];
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }

  const jwtSecret = process.env.JWT_SECRET!;
  if (jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters');
  }
  
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8080', 10),
    mongoUri: process.env.MONGODB_URI!,
    jwtSecret,
    jwtExpirationMs: parseInt(process.env.JWT_EXPIRATION_MS!, 10),
    invitationExpiryDays: parseInt(process.env.INVITATION_EXPIRY_DAYS || '7', 10),
    smtp: {
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '1025', 10),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.SMTP_FROM || 'noreply@smarttask.local',
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  };
}

const env: EnvConfig = validateEnv();

export default env;
