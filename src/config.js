import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://loperasofi:root@cluster0.z4plknc.mongodb.net/fish-web?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3000,
  SECRET: 'lestoma-api',
  SECRET_JWT: 'secretkey',
  EMAIL_USER:'fishwebapp@gmail.com',
  EMAIL_PASSWORD: 'iovejraqwwdhrguv'
};