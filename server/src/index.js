import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';

mongoose.connection.on('error', err => console.error('MongoDB connection error:', err.message));

try {
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
  app.listen(env.port, '0.0.0.0', () => console.log(`AI Mystery Room listening on port ${env.port}`));
} catch (err) {
  console.error('MongoDB unavailable:', err.message);
  process.exit(1);
}
