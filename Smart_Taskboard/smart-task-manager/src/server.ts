import http from 'http';
import app from './app';
import { init as initSocket } from './config/socket';
import { connect as connectDb } from './config/db';
import env from './config/env';

async function start(): Promise<void> {
  await connectDb();

  const httpServer = http.createServer(app);
  initSocket(httpServer);

  httpServer.listen(env.port, () => {
    console.log(`[Server] SmartTask API running on port ${env.port} (${env.nodeEnv})`);
  });
}

start().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
