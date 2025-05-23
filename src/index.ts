// src/index.ts
import dotenv from 'dotenv';
import { app, httpServer } from './app';

// Load .env
dotenv.config();

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
