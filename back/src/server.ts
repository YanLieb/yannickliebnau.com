import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';

import { mongoConnect } from './services/mongo';

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/portfolio";

const server = http.createServer(app);

async function startServer() {
  await mongoConnect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} : http://localhost:${PORT}`)
  })
}

startServer();