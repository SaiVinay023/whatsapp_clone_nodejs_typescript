// src/sockets/socketServer.ts
import { Server } from 'socket.io';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log(`🔥 New client connected: ${socket.id}`);

    socket.on('send_message', (data) => {
      console.log('Message received:', data);
      // broadcast message to receiver
      io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}
