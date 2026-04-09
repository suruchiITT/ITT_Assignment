import mongoose from 'mongoose';
import env from './env';

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('[DB] MongoDB connected:');
  } catch (err) {
    console.error('[DB] Connection failed:', (err as Error).message);
    process.exit(1);
  }
}
