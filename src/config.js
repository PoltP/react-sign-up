import dotenv from 'dotenv';

dotenv.config();

const serverPort = process.env.SERVERPORT || 8081;
const serverHost = process.env.SERVERHOST || '127.0.0.1';

export const config = {
  serverPort,
  serverHost,
  serverAPI: `http://${serverHost}:${serverPort}/api`
}
