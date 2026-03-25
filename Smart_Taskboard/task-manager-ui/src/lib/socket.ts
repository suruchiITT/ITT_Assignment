import { io, type Socket } from 'socket.io-client'

const SOCKET_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export interface ProjectSocketMessage {
  event: string
  payload: unknown
  ts: string
}

let socket: Socket | null = null

export function getProjectSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_BASE_URL, {
      path: '/ws',
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })
  }

  return socket
}
