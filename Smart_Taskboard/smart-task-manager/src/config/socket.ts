import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import env from './env';

let io: Server | undefined;

export function init(httpServer: HTTPServer): Server {
  io = new Server(httpServer, {
    path: '/ws',
    cors: { origin: env.corsOrigin, methods: ['GET', 'POST'], credentials: true },
  });

  io.on('connection', (socket: Socket) => {
    socket.on('join', ({ projectId, token }: { projectId: string; token: string }) => {
      try {
        jwt.verify(token, env.jwtSecret);
        socket.join(`project:${projectId}:task`);
        socket.join(`project:${projectId}:member`);
      } catch {
        socket.disconnect();
      }
    });

    socket.on('leave', ({ projectId }: { projectId: string }) => {
      socket.leave(`project:${projectId}:task`);
      socket.leave(`project:${projectId}:member`);
    });
  });

  return io;
}

export function getIo(): Server {
  if (!io) {
    throw new Error('Socket.IO not initialised');
  }
  return io;
}
