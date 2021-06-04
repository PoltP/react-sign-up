import dotenv from 'dotenv'

dotenv.config()

export default {
  serverPort: process.env.SERVERPORT || 8081,
  serverHost: process.env.SERVERHOST || '127.0.0.1'
}
