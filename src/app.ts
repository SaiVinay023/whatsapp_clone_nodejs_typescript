// src/app.ts
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocket } from './sockets/socketServer';
import userRoutes from './routes/UserRoutes';
import morgan from 'morgan';

const app = express();
const httpServer = createServer(app);

// WebSocket server
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*', // allow all (in dev mode)
  },
});

// Setup sockets
setupSocket(io);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(morgan('dev'));

// Default route
app.get('/', (req, res) => {
  res.send('WhatsApp Clone API Running 🚀');
});

export { app, httpServer };
