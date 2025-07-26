import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { router } from './routes/router';

const PORT = Number(process.env.PORT) || 3001;

const server = express();

server.use(
  helmet({
    contentSecurityPolicy: false,
    xPoweredBy: false,
  }),
);
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(router);

const run = () => {
  server.listen(PORT, () => {
    console.log(`\nServer started: http://localhost:${PORT}`);
  });
};

run();
