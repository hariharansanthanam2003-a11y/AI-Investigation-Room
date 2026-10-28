import dotenv from 'dotenv';
dotenv.config();
const nodeEnv = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET || (nodeEnv === 'development' ? 'development-only-change-this-secret' : undefined);
const mongoUri = process.env.MONGODB_URI || (nodeEnv === 'development' ? 'mongodb://127.0.0.1:27017/ai_mystery_room' : undefined);

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set outside development.');
}
if (!mongoUri) {
  throw new Error('MONGODB_URI must be set outside development.');
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri,
  geminiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  sessionSecret,
};
