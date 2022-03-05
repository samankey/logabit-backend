import http from 'http';
import app from './app';
import prisma from './prisma';
import dotenv from 'dotenv';

dotenv.config();
const server = http.createServer(app);
const { PORT } = process.env;

const start = async () => {
  try {
    server.listen(PORT, () =>
      console.log(`✅ Server is listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
