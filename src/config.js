import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/apilestoma",
  PORT: process.env.PORT || 3000,
  SECRET: 'lestoma-api',
  SECRET_JWT: 'secretkey',
  EMAIL_USER:'',
  EMAIL_PASSWORD: ''
};